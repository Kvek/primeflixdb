import Axios from 'axios';

const APIKey = 'b4ac50bea5731f7106812c256c1b3048';
const baseURL = 'https://api.themoviedb.org/3';

const params = { params: { api_key: APIKey } };

const get = (url) => Axios.get(`${baseURL}${url}`, params);

const post = (url, body) => Axios.post(`${baseURL}${url}`, params, { body });

const put = (url) => Axios.put(`${baseURL}${url}`, params);

const remove = (url) => Axios.delete(`${baseURL}${url}`, params);

// Endpoints
export const getPopular = () => get('/movie/popular');
