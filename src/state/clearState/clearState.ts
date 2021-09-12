import { selector } from 'recoil';
import { global } from '../apiErrorState';
import { authToken, user } from '../authState';
import { list } from '../pastSubsState';
import {
  error,
  loading,
  preview,
  selected,
  success,
} from '../submitModalState';
import { hasFinishedReadingState, hasReadState, top3List } from '../top3State';

// This selector exists to clear all Recoil state on logout and should be updated as state grows
export const all = selector<null>({
  key: 'clearState',
  get: () => null,
  set: ({ reset }) => {
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
  },
});
