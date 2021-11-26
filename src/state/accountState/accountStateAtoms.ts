import { atom } from 'recoil';

export const isSubmitted = atom<boolean>({
  key: 'form-submitted',
  default: false,
});

export const errors = atom<boolean>({
  key: 'form-errors',
  default: false,
});
