import { atom } from 'recoil';

// The votingState should contain a list of SubmissionIDs from the top3
const initialVotingState = [null, null, null];
export const selected = atom<Array<null | number>>({
  key: 'selectedVotes',
  default: initialVotingState,
});
