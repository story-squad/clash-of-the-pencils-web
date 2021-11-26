import { atom } from 'recoil';

export const isSubmitted = atom<boolean>({
  key: 'form-submitted',
  default: false,
});
