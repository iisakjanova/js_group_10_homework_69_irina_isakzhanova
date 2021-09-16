import {ADD_TV_SHOW_INFO, ADD_TV_SHOWS_LIST, CHANGE_SEARCH_PARAM, SHOW_PRELOADER} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_SEARCH_PARAM:
            return {...state, searchParam: action.payload};
        case ADD_TV_SHOWS_LIST:
            return {...state, shows: action.payload};
        case ADD_TV_SHOW_INFO:
            return {...state, info: action.payload};
        case SHOW_PRELOADER:
            return {...state, loading: action.payload};
        default:
            return state;
    }
};