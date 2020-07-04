import { atom } from 'recoil';

const filmTile = (id) =>
  atom({
    key: `${id}`,
    default: {}
  });

export default filmTile;
