import { atom } from 'recoil';

export const file = atom<File | undefined>({
  key: 'appSubmissionModalFileAtom',
  default: undefined,
});

export const preview = atom<string | undefined>({
  key: 'appSubmissionModalPreviewAtom',
  default: undefined,
});
