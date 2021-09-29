import { atom, atomFamily, selector } from 'recoil';
import { Voting } from '../../api';
import { phase } from '../appState';

export const hasReadSubInPosition = atomFamily<boolean, number>({
  key: 'hasReadSubInPositionAtomFamily',
  default: false,
});

export const hasReadAll = selector<boolean>({
  key: 'hasReadAllSubsSelector',
  get: ({ get }) => {
    // Stories should not be marked as read outside of the voting phase
    const currentPhase = get(phase);
    // So if it's not the voting phase, always return false
    if (currentPhase !== 'vote') return false;

    // Otherwise, check the status of all 3 stories
    const a = get(hasReadSubInPosition(1));
    const b = get(hasReadSubInPosition(2));
    const c = get(hasReadSubInPosition(3));
    return a && b && c;
  },
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
