import { selector } from 'recoil';
import { global } from '../apiErrorState';
import { userSubForToday } from '../appState';
import { file, preview } from '../appState/submissionModal';
import { authToken, user } from '../authState';
import { dropZone } from '../dndState';
import { list } from '../pastSubsState';
import { top3, userSubs } from '../submissionState';
import {
  dragonBankDropZoneKeys,
  hasReadSubInPosition,
  submissionDropZoneKeys,
  userVotes,
} from '../votingState';

// This selector exists to clear all Recoil state on logout and should be updated as state grows
export const all = selector<undefined>({
  key: 'clearState',
  get: () => undefined,
  set: ({ reset, get }) => {
    reset(authToken);
    reset(user);
    reset(list);
    reset(global);
    reset(userSubForToday);
    reset(userVotes);
    reset(file);
    reset(preview);
    reset(top3.list);
    reset(userSubs.list);

    // Reset Drop Zones to default
    get(dragonBankDropZoneKeys).map(dropZone).map(reset);
    get(submissionDropZoneKeys).map(dropZone).map(reset);
    // Reset read status of top 3
    [1, 2, 3].map(hasReadSubInPosition).map(reset);
  },
});
