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

export default {
  Seasonal
};
