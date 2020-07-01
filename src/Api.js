import Axios from 'axios';

const get = (url, params = {}) => Axios.get(url, { params });

// Endpoints

export const getConfig = () => get('/config');

export const getPopular = () => get('/popular');

export const getTrending = () => get('/trending');

export const getNowPlaying = () => get('/now_playing');

export const getMovies = () => get('/movies');

export const getVideo = (id) =>
  get('/video', {
    id: id,
  });
