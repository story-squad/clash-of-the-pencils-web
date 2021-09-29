import { atom, selector } from 'recoil';
import { Submissions, Voting } from '../../api';

export const userSubForToday = atom<Submissions.ISubItem | undefined>({
  key: 'usersSubForTodayAtom',
  default: selector({
    key: 'userSubForTodayDefaultSelector',
    get: Submissions.getUserSubForToday,
  }),
});

export const userHasSubmitted = atom<boolean>({
  key: 'userHasSubmittedAtom',
  default: false,
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
