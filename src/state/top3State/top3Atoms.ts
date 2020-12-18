import { atom } from 'recoil';
import { Submissions } from '../../api';

const top3InitState = null;

export const top3List = atom<Submissions.SubItem[] | null>({
  key: 'top3List',
  default: top3InitState,
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
