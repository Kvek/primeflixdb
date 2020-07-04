import { atom } from 'recoil';

const isSidebarOpen = atom({
  key: 'isSidebarOpen',
  default: false
});

export default isSidebarOpen;
