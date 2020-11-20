import { atom } from 'recoil';

export const global = atom<string | null>({
  key: 'globalAPIError',
  default: null,
});
