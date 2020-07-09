import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';

const defaultState = {
  appName: 'MyAnimeList',
  homeSeasonal: null,
  homeTopAiring: null,
  homeTopUpcoming: null,
  homePopular: null,
};

const reducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'HOME_SEASONAL':
      return { ...state, homeSeasonal: action.payload.data };
    case 'HOME_TOP_AIRING':
      return { ...state, homeTopAiring: action.payload.data };
    case 'HOME_TOP_UPCOMING':
      return { ...state, homeTopUpcoming: action.payload.data };
    case 'HOME_POPULAR':
      return { ...state, homePopular: action.payload.data };
    default:
  }
  return state;
};

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);

export default store;