import { atom } from 'recoil';

const trendingFilms = atom({
  key: 'trendingFilms',
  default: []
});

export default trendingFilms;
