import { selector } from 'recoil';
import { top3List } from '../top3State';
import { dndContainerState } from './dndAtoms';

interface Vote {
  rank: number;
  topthree_id: number;
}

export const voteSubmissionState = selector<Vote[] | null>({
  key: 'voteSubmissionState',
  get: ({ get }) => {
    const dndState = get(dndContainerState);
    const top3State = get(top3List);

    if (!top3State) return null;

    // Parse the top 3 state into the proper format for Vote items
    const response = top3State?.map((sub, i) => ({
      rank: parseInt(dndState[`sub-${i + 1}`].contents.slice(-1)),
      topthree_id: sub.id,
    }));

    return response;
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
