import { selector } from 'recoil';
import { readState } from './top3Atoms';

/**
 * Returns a count of all of the true vlaues in the readState atom
 */
export const getReadCount = selector<number>({
  key: 'readCount',
  get: ({ get }) => get(readState).filter(Boolean).length,
});
