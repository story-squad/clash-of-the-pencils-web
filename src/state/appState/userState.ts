import { atom, selector } from 'recoil';
import { auth } from '..';
import { Submissions } from '../../api';

export const userSubForToday = atom<Submissions.ISubItem | undefined>({
  key: 'usersSubForTodayAtom',
  default: selector({
    key: 'userSubForTodayDefaultSelector',
    get: async ({ get }) => {
      const loggedInUser = get(auth.user);
      // If not logged in, don't try authenticated API call! Just say no!
      if (!loggedInUser) return undefined;
      else {
        // If they are logged in, we can try the API call
        const sub = await Submissions.getUserSubForToday();
        return sub;
      }
    },
  }),
});

export const userHasSubmitted = selector<boolean>({
  key: 'userHasSubmittedSelector',
  get: ({ get }) => !!get(userSubForToday),
});
