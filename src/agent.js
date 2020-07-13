import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_MAL_API;

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody)
};

const Anime = {
  detail: (id) => requests.get(`/anime/` + id),
  video: (id, page) => requests.get(`/anime/` + id + `/videos?page=` + page),
  episode: (id, page) => requests.get(`/anime/` + id + `/episodes?page=` + page),
  review: (id, page) => requests.get(`/anime/` + id + `/reviews?page=` + page),
  recommendation: (id) => requests.get(`/anime/` + id + `/recommendations`),
  stats: (id, page) => requests.get(`/anime/` + id + `/stats?page=` + page),
  character: (id) => requests.get(`/anime/` + id + `/characters`),
  staff: (id) => requests.get(`/anime/` + id + `/staff`),
  news: (id) => requests.get(`/anime/` + id + `/news`),
  article: (id) => requests.get(`/anime/` + id + `/featured`),
  picture: (id) => requests.get(`/anime/` + id + `/pictures`),
  more: (id) => requests.get(`/anime/` + id + `/more-info`),
}

const Seasonal = {
  current: (year, season) =>
    requests.get(`/season?year=` + year + `&season=` + season)
};

const Top = {
  anime: (type, page) =>
    requests.get(`/top/anime?type=` + type + `&page=` + page)
}

const News = {
  list: (tag, page) =>
    requests.get(`/news?tag=` + tag + `&page=` + page)
}

const Article = {
  list: (tag, page) =>
    requests.get(`/featured?tag=` + tag + `&page=` + page)
}

const Review = {
  list: (type, page) =>
    requests.get(`/reviews/` + type + `?page=` + page)
}

const Recommendation = {
  list: (type, page) =>
    requests.get(`/recommendations/` + type + `?page=` + page)
}

export default {
  Anime,
  Seasonal,
  Top,
  News,
  Article,
  Review,
  Recommendation
};
