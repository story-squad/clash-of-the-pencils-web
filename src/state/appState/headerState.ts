import { atom } from 'recoil';

export const menuIsOpen = atom<boolean>({
  key: 'appStateHeaderMenuIsOpen',
  default: false,
});
