import {ADD_SEARCH_PARAM, ADD_TV_SHOW_INFO, ADD_TV_SHOWS_LIST, SELECT_TV_SHOW, SHOW_PRELOADER} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_SEARCH_PARAM:
            return {...state, searchParam: action.payload};
        case ADD_TV_SHOWS_LIST:
            return {...state, shows: action.payload};
        case SELECT_TV_SHOW:
            return {...state, selectedShow: action.payload};
        case ADD_TV_SHOW_INFO:
            return {...state, info: action.payload};
        case SHOW_PRELOADER:
            return {...state, loading: action.payload};
        default:
            return state;
    }
};