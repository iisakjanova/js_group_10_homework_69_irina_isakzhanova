import React, {useCallback, useEffect, useReducer} from 'react';
import {Backdrop, CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";

import {reducer} from "../../store/reduser";
import axiosApi from "../../axiosApi";
import {addTVShowInfo, showPreloader} from "../../store/actions";
import TVShowSearch from "../TVShowSearch/TVShowSearch";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    content: {
        flexWrap: "nowrap",
        paddingTop: theme.spacing(5),
    }
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
        <div className={classes.root}>
            {state.loading
                ?
                <Backdrop className={classes.backdrop} open={state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                :
                state.info
                    ?
                    <>
                        <TVShowSearch
                            value={state.selectedShow || state.info.name}
                        />
                        <Grid container direction="row" spacing={4} className={classes.content}>
                            <Grid item>
                                <img src={state.info.image?.medium} alt={state.info.name} />
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">
                                    {state.info.name}
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: state.info.summary }} />
                                <Typography variant="subtitle1">
                                    <b>Language: </b> {state.info.language || ''}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <b>Rating: </b> {state.info.rating?.average}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <b>Country: </b> {state.info.network?.country.name}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <b>Official site: </b>
                                    <a href={state.info.officialSite}>{state.info.officialSite || ''}</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                    :
                    null
            }
        </div>
    );
};

export default TVShow;