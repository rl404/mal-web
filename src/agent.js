import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

// const API_ROOT = 'https://mal-api.rl404.com';
const API_ROOT = '';

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody)
};

const Articles = {
  all: page =>
    requests.get(`/articles?limit=10`)
};

export default {
  Articles
};
