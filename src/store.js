import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';

const defaultState = {
  appName: 'MyAnimeList',

  // Home
  homeSeasonal: null,
  homeTopAiring: null,
  homeTopUpcoming: null,
  homePopular: null,
  homeNews: null,
  homeArticle: null,
  homeReview: null,
  homeRecommendation: null,

  // Anime
  animeDetail: null,
};

const reducer = function (state = defaultState, action) {
  switch (action.type) {
    // Home.
    case 'HOME_SEASONAL':
      return { ...state, homeSeasonal: action.payload.data };
    case 'HOME_TOP_AIRING':
      return { ...state, homeTopAiring: action.payload.data };
    case 'HOME_TOP_UPCOMING':
      return { ...state, homeTopUpcoming: action.payload.data };
    case 'HOME_POPULAR':
      return { ...state, homePopular: action.payload.data };
    case 'HOME_NEWS':
      return { ...state, homeNews: action.payload.data };
    case 'HOME_ARTICLE':
      return { ...state, homeArticle: action.payload.data };
    case 'HOME_REVIEW':
      return { ...state, homeReview: action.payload.data };
    case 'HOME_RECOMMENDATION':
      return { ...state, homeRecommendation: action.payload.data };

    // Anime.
    case 'ANIME_DETAIL':
      return { ...state, animeDetail: action.payload.data };
    default:
  }
  return state;
};

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);

export default store;