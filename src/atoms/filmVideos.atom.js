import { atom } from 'recoil';

const filmVideos = (id) =>
  atom({
    key: `${id}`,
    default: {},
  });

export default filmVideos;
