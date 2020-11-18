import { selector } from 'recoil';
import { top3List, hasFinishedReadingState, hasReadState } from '../top3State';
import { DnDContainerState } from '../DnDState';
import { list } from '../pastSubsState';
import { userId } from '../userState';

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
  },
});
