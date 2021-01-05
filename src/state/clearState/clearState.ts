import { selector } from 'recoil';
import { global } from '../apiErrorState';
import {
  authModalOpen,
  email,
  loginToken,
  signupWasSuccessful,
  userId,
  username,
} from '../authState';
import { dndContainerState } from '../dndState';
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
    reset(loginToken);
    reset(authModalOpen);
    reset(signupWasSuccessful);
    reset(top3List);
    reset(dndContainerState);
    reset(hasFinishedReadingState);
    reset(hasReadState);
    reset(list);
    reset(userId);
    reset(email);
    reset(username);
    reset(global);
    reset(error);
    reset(loading);
    reset(preview);
    reset(selected);
    reset(success);
  },
});
