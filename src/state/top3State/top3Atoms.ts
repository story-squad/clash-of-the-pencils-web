import { atom, selector } from 'recoil';
import { Submissions } from '../../api';
import { phase } from '../appState';

export const top3List = atom<Submissions.ISubItem[]>({
  key: 'top3List',
  default: selector({
    key: 'defaultTop3Selector',
    get: async ({ get }) => {
      // This will subscribe to the phase, cause a refresh of
      // this list whenever the phase changes
      const curPhase = get(phase);
      if (curPhase === 'vote') {
        return await Submissions.getTop3Subs();
      } else {
        // When it's not voting phase, don't run the API call
        return [];
      }
    },
  }),
});

const initialHasReadState = [false, false, false];
export const hasReadState = atom<boolean[]>({
  key: 'hasRead',
  default: initialHasReadState,
});

export const hasFinishedReadingState = atom<boolean>({
  key: 'hasFinishedReading',
  default: false,
});
