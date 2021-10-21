import { atom, selector } from 'recoil';
import { PastStreams } from '../../api';

export const latest = atom<PastStreams.StreamURLItem>({
  key: 'latestStreamURLAtom',
  default: selector({
    key: 'latestStreamURLAtomDefaultSelector',
    get: PastStreams.getLatest,
  }),
});
