export const ADD_SEARCH_PARAM = 'ADD_SEARCH_PARAM';
export const ADD_TV_SHOWS_LIST = 'ADD_TV_SHOWS_LIST';
export const SELECT_TV_SHOW = 'SELECT_TV_SHOW';

export const addSearchParam = param => ({type: ADD_SEARCH_PARAM, payload: param});
export const addTVShowsList = shows => ({type: ADD_TV_SHOWS_LIST, payload: shows});
export const selectTVShow = value => ({type: SELECT_TV_SHOW, payload: value});