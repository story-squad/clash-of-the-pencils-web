import { atom, selector } from 'recoil';
import { Voting } from '../../api';
import { top3List } from '../top3State';

const defaultVotingDragAndDropValue = {
  'sub-1': undefined,
  'sub-2': undefined,
  'sub-3': undefined,
  'vote-1': 'award-1',
  'vote-2': 'award-2',
  'vote-3': 'award-3',
};

export const dragAndDropState = atom<Record<string, string | undefined>>({
  key: 'votingDragAndDropState',
  default: defaultVotingDragAndDropValue,
});

export const formattedVotes = selector<Voting.IPostVotesBody>({
  key: 'formattedVotesSelector',
  get: ({ get }) => {
    const top3 = get(top3List);
    // Make sure it's set (for linting)
    if (!top3) {
      throw new Error('Could not get top 3 submissions');
    }
    // Get the DND state
    const dndState = get(dragAndDropState);
    // If a user is able to submit, that means all the submission fields are full
    const userCanSubmit = get(canSubmit);
    if (!userCanSubmit) {
      // If they can't submit, then they still need to finish voting
      throw new Error('Voting is incomplete');
    }
    // Initialize response array
    const res: Voting.IPostVotesBody = [];

    // Check all 3 submissions
    for (let i = 1; i <= 3; i++) {
      const dndSubItem = dndState[`sub-${i}`]; // Returns `award-n` as a string
      // Make sure one last time that they voted
      if (dndSubItem === undefined) throw new Error('Voting is incomplete');
      else {
        // Get the index of the relevant submission, find the id, add to res
        const subIndex = +dndSubItem.split('-')[1] - 1; // Awards start at 1 but index starts at 0
        res.push(top3[subIndex].id); // Store the id of the specified submission
      }
    }

    return res;
  },
});

export const canSubmit = selector<boolean>({
  key: 'canSubmitVotesSelector',
  get: ({ get }) => {
    const dndState = get(dragAndDropState);
    return !!dndState['sub-1'] && !!dndState['sub-2'] && !!dndState['sub-3'];
  },
});
