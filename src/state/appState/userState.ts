import { atom } from 'recoil';

export const userHasSubmitted = atom<boolean>({
  key: 'userHasSubmittedAtom',
  default: false,
});

export const userHasVoted = atom<boolean>({
  key: 'userHasVotedAtom',
  default: false,
});
