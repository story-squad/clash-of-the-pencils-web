import { selector } from 'recoil';
import { hasReadState } from './top3Atoms';

/**
 * Returns a count of all of the true vlaues in the hasReadState atom
 */
export const getReadCount = selector<number>({
  key: 'readCount',
  get: ({ get }) => get(hasReadState).filter(Boolean).length,
});
