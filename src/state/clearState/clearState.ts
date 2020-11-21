import { selector } from 'recoil';
import { top3List, hasFinishedReadingState, hasReadState } from '../top3State';
import { DnDContainerState } from '../DnDState';
import { list } from '../pastSubsState';
import { userId, email, username } from '../userState';
import { global } from '../apiErrorState';
import { currentPrompt } from '../promptState';
import { histogram, winner } from '../resultsState';
import {
  error,
  loading,
  preview,
  selected,
  success,
} from '../submitModalState';

// This selector exists to clear all Recoil state on logout and should be updated as state grows
export const all = selector<null>({
  key: 'clearState',
  get: () => null,
  set: ({ reset }) => {
    reset(top3List);
    reset(DnDContainerState);
    reset(hasFinishedReadingState);
    reset(hasReadState);
    reset(list);
    reset(userId);
    reset(email);
    reset(username);
    reset(global);
    reset(currentPrompt);
    reset(histogram);
    reset(winner);
    reset(error);
    reset(loading);
    reset(preview);
    reset(selected);
    reset(success);
  },
});
