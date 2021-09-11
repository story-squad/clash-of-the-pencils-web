import { atom, selector } from 'recoil';
import { Submissions } from '../../api';

export const top3List = atom<Submissions.ISubItem[]>({
  key: 'top3List',
  default: selector({
    key: 'defaultTop3Selector',
    get: Submissions.getTop3Subs, // Use this as the default getter
  }),
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
