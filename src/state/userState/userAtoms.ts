import { atom } from 'recoil';

export const userId = atom<number | null>({
  key: 'userId',
  default: null,
});
