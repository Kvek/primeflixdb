import { atom } from 'recoil';

const mediaTile = (id) =>
  atom({
    key: `${id}`,
    default: {}
  });

export default mediaTile;
