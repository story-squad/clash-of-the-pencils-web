import { atom, selector } from 'recoil';
import { auth } from '..';
import { Submissions, Voting } from '../../api';

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

// Gets the user's vote from the server, or undefined
export const userVotes = atom<Voting.IVote | undefined>({
  key: 'userVotesAtom',
  default: selector({
    key: 'userVotesDefaultSelector',
    get: Voting.getUserVoteForToday,
  }),
});

// Checks if the user has voted based on their vote
export const userHasVoted = selector<boolean>({
  key: 'userHasVotedSelector',
  get: ({ get }) => !!get(userVotes),
});
