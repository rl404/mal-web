import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';

const defaultState = {
  appName: 'MyAnimeList',
  animeSeasonal: null
};

const reducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return { ...state, animeSeasonal: action.payload.data };
    default:
  }
  return state;
};

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);

export default store;