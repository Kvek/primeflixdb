import Axios from 'axios';

const get = (url, param = {}) => Axios.get(url, { ...param });

// Endpoints

export const getConfig = () => get('/config');

export const getPopular = () => get('/popular');

export const getTrending = () => get('/trending');

export const getNowPlaying = () => get('/now_playing');

export const getMovies = () => get('/movies');
