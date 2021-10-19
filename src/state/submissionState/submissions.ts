import { atomFamily, selectorFamily } from 'recoil';
import { Submissions } from '../../api';
import { isLoggedIn } from '../authState';

export const getById = atomFamily<Submissions.ISubItem | undefined, number>({
  key: 'subItemAtomFamily',
  default: selectorFamily({
    key: 'subItemAtomFamilyDefaultSelector',
    get:
      (subId) =>
      async ({ get }) => {
        const userIsLoggedIn = get(isLoggedIn);
        if (!userIsLoggedIn) return undefined;
        else return await Submissions.getById(subId);
      },
  }),
});
