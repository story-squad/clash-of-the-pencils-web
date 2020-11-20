import { selector } from 'recoil';
import { DnDContainerState } from './DnDAtoms';

export const voteSubmissionState = selector({
  key: 'voteSubmissionState',
  get: ({ get }) => {
    const DnDState = get(DnDContainerState);
    /**
     * derive the place order from the draggable id (i.e. "award-1")
     * these need to be numbers so we parse the integer from the string
     * value of 1, 2 or 3
     */
    // get the string ids
    let sub1: string | number = DnDState['sub-1'].contents;
    let sub2: string | number = DnDState['sub-2'].contents;
    let sub3: string | number = DnDState['sub-3'].contents;
    // get the last character which will be either 1, 2 or 3
    sub1 = sub1.charAt(sub1.length - 1);
    sub2 = sub2.charAt(sub2.length - 1);
    sub3 = sub3.charAt(sub3.length - 1);
    // parse the string type values into type number
    sub1 = parseInt(sub1);
    sub2 = parseInt(sub2);
    sub3 = parseInt(sub3);
    // return the object for the vote submission request
    return [
      { rank: sub1, topthree_id: 1 },
      { rank: sub2, topthree_id: 2 },
      { rank: sub3, topthree_id: 3 },
    ];
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
