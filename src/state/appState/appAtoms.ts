import { atom } from 'recoil';

export const headerMenuIsOpen = atom<boolean>({
  key: 'appStateHeaderMenuIsOpen',
  default: false,
});
