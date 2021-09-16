import React, {useCallback, useEffect, useReducer} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

import {reducer} from "../../store/reduser";
import {changeSearchParam, addTVShowsList} from "../../store/actions";
import axiosApi from "../../axiosApi";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(3),
    },
    label: {
        paddingRight: theme.spacing(3),
        alignSelf: "center",
    },
}));

const initialState = {
    searchParam: '',
    shows: [],
};

const filter = createFilterOptions();

const TVShowSearch = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInputChange = async (param) => {
        console.log(param)
        dispatch(changeSearchParam(param));
    };

    const handleSelectShow = value => {
        if (value) {
            history.push(`/shows/${value.show.id}`);
        }
    };

    const getShows = useCallback( async () => {
        let shows = [];

        try {
            if (state.searchParam) {
                const response = await axiosApi.get(`/search/shows?q=${state.searchParam}`);
                shows = response.data;
            }
        } catch (e) {
            console.log(e);
        }

        return shows;
    }, [state.searchParam]);

    useEffect(() => {
        (async () => {
            const shows = await getShows();
            dispatch(addTVShowsList(shows));
        })();
        return () => {

        }
    }, [getShows]);

    return (
        <Grid container direction="row" className={classes.root}>
            <Typography variant="subtitle1" className={classes.label}>Search for TV Show</Typography>
            <Autocomplete
                inputValue={props.inputValue || state.searchParam}
                value={props.value || ''}
                onChange={(e, value) => handleSelectShow(value || '')}
                onInputChange={(e, name) => handleInputChange(name || '')}
                filterOptions={(options, params) => {
                    return filter(options, params);
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={state.shows}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }

                    return option.show.name;
                }}
                renderOption={(option) => option.show.name}
                style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                )}
            />
        </Grid>
    );
};

export default TVShowSearch;