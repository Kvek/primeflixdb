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

const getCertification = (media, id) => get(`/${media}/${id}/release_dates`);

const getMovieFanArt = (id) =>
  Axios.get(`https://webservice.fanart.tv/v3/movies/${id}?api_key=d66c372c525322e8c23b39d2eeae3f67
`);

const getTvFanArt = (id) =>
  Axios.get(`https://webservice.fanart.tv/v3/tv/${id}?api_key=d66c372c525322e8c23b39d2eeae3f67
`);

module.exports = {
  getConfig,
  getImdbId,
  getPopular,
  getTrending,
  getMediaVideo,
  getNowPlaying,
  getMovieFanArt,
  getTvFanArt,
  getCertification,
};
