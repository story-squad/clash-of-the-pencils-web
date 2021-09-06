import { atom, selector } from 'recoil';
import { Voting } from '../../api';
import { top3List } from '../top3State';

// Prefixes to identify the draggables
export const DRAGON = 'dragon';
export const DRAG_BANK = 'drag-bank';
export const DROP_ZONE = 'drop-zone';
/**
 * The structure of our drag and drop state for voting. There are 6
 * droppable containers, the `drop-zones` and the `drag-banks`, and
 * 3 draggable items, the `dragons`. The dragons will initially be
 * located in the `drag-bank` containers. A container is empty when
 * its value is `undefined`
 */
const defaultVotingDragAndDropValue = {
  [`${DROP_ZONE}-1`]: undefined,
  [`${DROP_ZONE}-2`]: undefined,
  [`${DROP_ZONE}-3`]: undefined,
  [`${DRAG_BANK}-1`]: `${DRAGON}-1`,
  [`${DRAG_BANK}-2`]: `${DRAGON}-2`,
  [`${DRAG_BANK}-3`]: `${DRAGON}-3`,
};

/**
 * The state that manages the position of elements
 * in the voting "Dragon Drop" mechanism.
 */
export const dragAndDropState = atom<Record<string, string | undefined>>({
  key: 'votingDragAndDropState',
  default: defaultVotingDragAndDropValue,
});

/**
 * A selector that will return the derived state value necessary
 * for submitting votes to the API. It reads the drag-and-drop
 * state and returns an array of integers, being the top 3 submissions
 * in order of 1st to 3rd place, as voted by the user.
 *
 * If there are any empty submissions containers (you didn't
 * finish voting) or if the top 3 haven't been set from the API,
 * this selector will return `undefined`.
 */
export const formattedVotes = selector<Voting.IPostVotesBody | undefined>({
  key: 'formattedVotesSelector',
  get: ({ get }) => {
    const top3 = get(top3List);
    // Make sure it's set (for linting)
    if (!top3) return undefined;
    // Get the DND state
    const dndState = get(dragAndDropState);
    // If a user is able to submit, that means all the submission fields are full
    const userCanSubmit = get(canSubmit);
    // If they can't submit, then they still need to finish voting
    if (!userCanSubmit) return undefined;
    // Initialize response array
    const res: Voting.IPostVotesBody = [];

    // Check all 3 submissions
    for (let i = 1; i <= 3; i++) {
      const dndSubItem = dndState[`sub-${i}`]; // Returns `award-n` as a string
      if (dndSubItem === undefined) {
        // Make sure one last time that they voted
        return undefined;
      } else {
        // Get the index of the relevant submission, find the id, add to res
        const subIndex = +dndSubItem.split('-')[1] - 1; // Awards start at 1 but index starts at 0
        res.push(top3[subIndex].id); // Store the id of the specified submission
      }
    }

    return res;
  },
});

/**
 * A selector that checks the Dnd state of the voting mechanism
 * and returns `true` if all of the  votes have been cast. All of
 * the votes will be considered cast if every `drop-zone` container
 * has a draggable inside of it.
 */
export const canSubmit = selector<boolean>({
  key: 'canSubmitVotesSelector',
  get: ({ get }) => {
    const dndState = get(dragAndDropState);
    return (
      !!dndState[`${DROP_ZONE}-1`] &&
      !!dndState[`${DROP_ZONE}-2`] &&
      !!dndState[`${DROP_ZONE}-3`]
    );
  },
});
