import React, {useCallback, useEffect, useReducer} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles} from "@material-ui/core";

import {reducer} from "../../store/reduser";
import axiosApi from "../../axiosApi";
import {addTVShowInfo, showPreloader} from "../../store/actions";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const initialState = {
    info: '',
    loading: false,
};

const TVShow = ({match}) => {
    const classes = useStyles();

    const [state, dispatch] = useReducer(reducer, initialState);

    const id = match.params.id;

    const getShowInfo = useCallback( async () => {
        let info = [];
        dispatch(showPreloader(true));
        try {
            if (id) {
                const response = await axiosApi.get(`/shows/${id}`);
                info = response.data;
            }
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(showPreloader(false));
        }

        return info;
    }, [id]);

    useEffect(() => {
        (async () => {
            const info = await getShowInfo();
            dispatch(addTVShowInfo(info));
        })();
    }, [getShowInfo]);
    return (
        <Grid container className={classes.root}>
            <Backdrop className={classes.backdrop} open={state.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            TVShow
        </Grid>
    );
};

export default TVShow;