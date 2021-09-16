export const CHANGE_SEARCH_PARAM = 'CHANGE_SEARCH_PARAM';
export const ADD_TV_SHOWS_LIST = 'ADD_TV_SHOWS_LIST';
export const ADD_TV_SHOW_INFO = 'ADD_TV_SHOW_INFO';
export const SHOW_PRELOADER = 'SHOW_PRELOADER';

export const changeSearchParam = param => ({type: CHANGE_SEARCH_PARAM, payload: param});
export const addTVShowsList = shows => ({type: ADD_TV_SHOWS_LIST, payload: shows});
export const addTVShowInfo = info => ({type: ADD_TV_SHOW_INFO, payload: info});
export const showPreloader = boolean => ({type: SHOW_PRELOADER, payload: boolean});