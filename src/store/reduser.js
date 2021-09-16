import {ADD_SEARCH_PARAM, ADD_TV_SHOWS_LIST, SELECT_TV_SHOW} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_SEARCH_PARAM:
            return {...state, searchParam: action.payload};
        case ADD_TV_SHOWS_LIST:
            return {...state, shows: action.payload};
        case SELECT_TV_SHOW:
            return {...state, selectedShow: action.payload};
        default:
            return state;
    }
};