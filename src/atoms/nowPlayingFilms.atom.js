import { atom } from 'recoil';

const nowPlayingFilms = atom({
  key: 'nowPlayingFilms',
  default: [],
});

export default nowPlayingFilms;
