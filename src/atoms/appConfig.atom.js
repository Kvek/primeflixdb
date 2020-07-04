import { atom } from 'recoil';

const appConfig = atom({
  key: 'appConfig',
  default: []
});

export default appConfig;
