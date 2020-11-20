import { selector } from 'recoil';
import { top3List } from '../top3State';
import { DnDContainerState } from './DnDAtoms';

interface Vote {
  rank: number;
  topthree_id: number;
}

export const voteSubmissionState = selector<Vote[] | null>({
  key: 'voteSubmissionState',
  get: ({ get }) => {
    const DnDState = get(DnDContainerState);
    const top3State = get(top3List);

    if (!top3State) return null;

    const response = top3State?.map((sub, i) => ({
      rank: parseInt(DnDState[`sub-${i + 1}`].contents.slice(-1)),
      topthree_id: sub.id,
    }));

    return response;
  },
});

export const disableVoteButton = selector<boolean>({
  key: 'disableVoteButton',
  get: ({ get }) => {
    const DnDState = get(DnDContainerState);
    return (
      DnDState['sub-1'].isEmpty ||
      DnDState['sub-2'].isEmpty ||
      DnDState['sub-3'].isEmpty
    );
  },
});
