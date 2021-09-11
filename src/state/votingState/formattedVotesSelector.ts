import { selector } from 'recoil';
import { Voting } from '../../api';
import { dropZone, splitKey } from '../dndState';
import { top3List } from '../top3State';
import { canSubmit, submissionDropZoneKeys } from './votingState';

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

    // If a user is able to submit, that means all the submission fields are full
    const userCanSubmit = get(canSubmit);
    // If they can't submit, then they still need to finish voting
    if (!userCanSubmit) return undefined;

    // Get the submission drop zone values
    const subDropZoneContents = get(submissionDropZoneKeys)
      .map(dropZone)
      .map(get)
      .map(({ contents }) => contents);

    // Convert to an array containing the places awarded in order
    const places = subDropZoneContents.map((content) => {
      if (!content) return undefined;
      else {
        const [, placeNum] = splitKey(content);
        return placeNum;
      }
    });
    // Only return the response if all 3 votes were cast (all values are truthy, not undefined)
    if (!places.every(Boolean)) return undefined;

    // Here, we map our placement array with the top 3 submissions to get the ids
    // of the submissions in the order the user voted for them, from 1 to 3
    const res: (number | undefined)[] = [undefined, undefined, undefined];

    top3.forEach(({ id }, i) => {
      const place = places[i] as number; // Places are 1-3, and at this point we've checked for undefined a lot
      res[place - 1] = id; // Here we add the id to the array, with index being `place - 1` (1-3 => 0-2)
    });
    // Make sure we have an array of 3 integers, returning undefined if not
    if (res.map(Number).filter(Boolean).length !== 3) return undefined;
    // Return the integers
    else return res as number[];
  },
});
