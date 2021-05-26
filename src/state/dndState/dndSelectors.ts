import { selector } from 'recoil';
import { top3List } from '../top3State';
import { dndContainerState } from './dndAtoms';

interface Vote {
  votes: number[];
}

export const voteSubmissionState = selector<Vote | null>({
  key: 'voteSubmissionState',
  get: ({ get }) => {
    const dndState = get(dndContainerState);
    const top3State = get(top3List);
    if (!top3State) return null;

    const votes = top3State.map((sub, i) =>
      parseInt(dndState[`sub-${i + 1}`].contents.slice(-1)),
    );

    return { votes };
  },
});

export const disableVoteButton = selector<boolean>({
  key: 'disableVoteButton',
  get: ({ get }) => {
    const dndState = get(dndContainerState);
    return (
      dndState['sub-1'].isEmpty ||
      dndState['sub-2'].isEmpty ||
      dndState['sub-3'].isEmpty
    );
  },
});
