import { atom } from 'recoil';

const tileCarousel = (id) =>
  atom({
    key: `${id}`,
    default: {}
  });

export default tileCarousel;
