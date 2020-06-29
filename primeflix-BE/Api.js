const Axios = require('axios');

const APIKey = 'b4ac50bea5731f7106812c256c1b3048';
const baseURL = 'https://api.themoviedb.org/3';

const params = { params: { api_key: APIKey } };

const get = (url, param = {}) =>
  Axios.get(`${baseURL}${url}`, { ...params, ...param });

const post = (url, body) => Axios.post(`${baseURL}${url}`, params, { body });

const put = (url) => Axios.put(`${baseURL}${url}`, params);

const remove = (url) => Axios.delete(`${baseURL}${url}`, params);

// Endpoints

const getConfig = () => get('/configuration');

const getPopular = () => get('/movie/popular');

const getTrending = () => get('/trending/all/week');

const getNowPlaying = () => get('/movie/now_playing');

const getMediaVideo = (media, id) => get(`/${media}/${id}/videos`);

const getImdbId = (media, id) => get(`/${media}/${id}/external_ids`);

module.exports = {
  getConfig,
  getImdbId,
  getPopular,
  getTrending,
  getMediaVideo,
  getNowPlaying,
};
