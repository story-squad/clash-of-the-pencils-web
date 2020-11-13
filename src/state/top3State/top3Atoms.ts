import { atom } from 'recoil';
import { Submissions } from '../../api';

export const top3State = atom<Submissions.SubItem[] | null>({
  key: 'top3',
  default: null,
});

const initialReadState = [false, false, false];
export const readState = atom<boolean[]>({
  key: 'readState',
  default: initialReadState,
});

export const finishedReading = atom<boolean>({
  key: 'finishedReading',
  default: false,
});
