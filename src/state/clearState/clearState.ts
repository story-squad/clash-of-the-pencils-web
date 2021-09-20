import { selector } from 'recoil';
import { global } from '../apiErrorState';
import { authToken, user } from '../authState';
import { dropZone } from '../dndState';
import { list } from '../pastSubsState';
import {
  error,
  loading,
  preview,
  selected,
  success,
} from '../submitModalState';
import { hasFinishedReadingState, hasReadState, top3List } from '../top3State';
import {
  dragonBankDropZoneKeys,
  hasReadSubInPosition,
  submissionDropZoneKeys,
} from '../votingState';

// This selector exists to clear all Recoil state on logout and should be updated as state grows
export const all = selector<undefined>({
  key: 'clearState',
  get: () => undefined,
  set: ({ reset, get }) => {
    // TODO after state cleanup, clean these up too
    reset(authToken);
    reset(user);
    reset(top3List);
    reset(hasFinishedReadingState);
    reset(hasReadState);
    reset(list);
    reset(global);
    reset(error);
    reset(loading);
    reset(preview);
    reset(selected);
    reset(success);

    // Reset Drop Zones to default
    get(dragonBankDropZoneKeys).map(dropZone).map(reset);
    get(submissionDropZoneKeys).map(dropZone).map(reset);
    // Reset read status of top 3
    [1, 2, 3].map(hasReadSubInPosition).map(reset);
  },
});
