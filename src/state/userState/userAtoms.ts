import { atom } from 'recoil';

export const loginToken = atom<string | null>({
  key: 'loginToken',
  default: null,
});

export const userId = atom<number | null>({
  key: 'userId',
  default: null,
});

export const username = atom<string | null>({
  key: 'username',
  default: null,
});

export const email = atom<string | null>({
  key: 'userEmail',
  default: null,
});
