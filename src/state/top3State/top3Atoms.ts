import { atom } from 'recoil';
import { Submissions } from '../../api';

export const top3List = atom<Submissions.ISubItem[] | undefined>({
  key: 'top3List',
  default: undefined,
});

const initialHasReadState = [false, false, false];
export const hasReadState = atom<boolean[]>({
  key: 'hasRead',
  default: initialHasReadState,
});

export const hasFinishedReadingState = atom<boolean>({
  key: 'hasFinishedReading',
  default: false,
});
