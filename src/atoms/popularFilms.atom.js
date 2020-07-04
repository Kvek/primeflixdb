import { atom } from 'recoil';

const popularFilms = atom({
  key: 'popularFilms',
  default: []
});

export default popularFilms;
