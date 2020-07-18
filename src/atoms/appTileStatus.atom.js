import { atom } from 'recoil';

const appTileMetaShown = atom({
  key: 'appTileMetaShown',
  default: { currentMetaTileId: null }
});

export default appTileMetaShown;
