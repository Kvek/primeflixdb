import Axios from 'axios';

const baseURL = 'https://primeflix-be.herokuapp.com';

const get = (url, params = {}) => Axios.get(`${baseURL}${url}`, { params });

// Endpoints

export const getConfig = () => get('/config');

export const getPopular = () => get('/popular');

export const getTrending = () => get('/trending');

export const getNowPlaying = () => get('/now_playing');

export const getMovies = () => get('/movies');

export const getMoviedata = (id, params) => get('/moviedata', { id, params });

export const getCertification = (id) => get('/certification', { id });

export const getVideo = (id) => get('/video', { id });

export const getImdbId = (media, id) => get('/imdbID', { media, id });

export const getFanArt = (media, id) => get('/fan_art', { media, id });
