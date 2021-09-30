import { atom, selector } from 'recoil';
import { dropZone, DropZoneContainer } from '../dndState';
import { userHasVoted } from './userVotingStatus';

// Prefixes to identify the draggables
export const DRAGON = 'dragon';
export const SUBMISSION_ZONE = 'submission';
export const DRAGON_BANK_ZONE = 'dragonBank';

/** Keep track of the drop zone keys in an atom */
export const submissionDropZoneKeys = atom<string[]>({
  key: 'submissionDropZoneKeys',
  default: [
    `${SUBMISSION_ZONE}-1`,
    `${SUBMISSION_ZONE}-2`,
    `${SUBMISSION_ZONE}-3`,
  ],
});
/** Keep track of the drop zone keys in an atom */
export const dragonBankDropZoneKeys = atom<string[]>({
  key: 'dragonBankDropZoneKeys',
  default: [
    `${DRAGON_BANK_ZONE}-1`,
    `${DRAGON_BANK_ZONE}-2`,
    `${DRAGON_BANK_ZONE}-3`,
  ],
});
export const dragonBank = selector<DropZoneContainer[]>({
  key: 'dragonBankSelector',
  get: ({ get }) => {
    // Get Dragon Bank Drop Zones
    return get(dragonBankDropZoneKeys).map(dropZone).map(get);
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
    const userHasVotedValue = get(userHasVoted);
    // User can't submit more votes if they already voted!
    if (userHasVotedValue === true) return false;
    // Get the contents of the submission drop zones
    const subDropZoneContents = get(submissionDropZoneKeys)
      .map(dropZone)
      .map(get);
    // Return true if all of them have content
    return subDropZoneContents.every(
      (val) => val.contents !== undefined && !val.isEmpty,
    );
  },
});

export const resetDropZones = selector<undefined>({
  key: 'resetDropZonesSelector',
  get: () => undefined,
  set: ({ get, reset }) => {
    // Reset the Submission Drop Zones
    get(submissionDropZoneKeys).map(dropZone).map(reset);
    // Reset the Dragon Bank Drop Zones
    get(dragonBankDropZoneKeys).map(dropZone).map(reset);
  },
});
