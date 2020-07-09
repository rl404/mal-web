import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://mal-api.rl404.com/v1';

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody)
};

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
  Seasonal,
  Top,
  News,
  Article,
  Review,
  Recommendation
};
