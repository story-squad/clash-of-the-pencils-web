import { selector, selectorFamily } from 'recoil';
import { Submissions } from '../../api';
import { hasReadState, top3List } from './top3Atoms';

/**
 * Returns a count of all of the true vlaues in the hasReadState atom
 */
export const getReadCount = selector<number>({
  key: 'readCount',
  get: ({ get }) => get(hasReadState).filter(Boolean).length,
});

// This hasn't been used yet, and is mostly here to serve as an example
// of how to use the powerful selectorFamily syntax
export const getTop3ByIndex = selectorFamily<
  Submissions.SubItem | null, // The return value of the getter, subission or null
  number // The parameter passed into the getter, here a numbered array index
>({
  key: 'top3ByIndex',
  // 'get' is passed a double callback, first the params, then the standard getter
  get: (index) => ({ get }) => {
    const list = get(top3List);
    // If the list has already been loaded, you can load the specific item
    if (list) return list[index];
    else return null;
  },
});
