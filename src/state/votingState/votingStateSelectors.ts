import { selectorFamily } from 'recoil';

import { selected } from './votingStateAtoms';

export const byIndex = selectorFamily<number | null, number>({
  key: 'voteByIndex',
  get: (index) => ({ get }) => {
    const list = get(selected);
    if (list) return list[index];
    else return null;
  },
});
