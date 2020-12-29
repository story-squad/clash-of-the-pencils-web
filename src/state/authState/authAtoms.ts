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

export const authModalOpen = atom<boolean>({
  key: 'authModalOpen',
  default: false,
});

export const authModalIsLogin = atom<boolean>({
  key: 'authModalIsLogin',
  default: true,
});

export const signupWasSuccessful = atom<boolean>({
  key: 'signupWasSuccesful',
  default: false,
});
