import { atomFamily, selector } from 'recoil';
import { time } from '../../utils';
import { now } from '../appState';

export const hasReadSubInPosition = atomFamily<boolean, number>({
  key: 'hasReadSubInPositionAtomFamily',
  default: false,
});

export const hasReadAll = selector<boolean>({
  key: 'hasReadAllSubsSelector',
  get: ({ get }) => {
    // Stories should not be marked as read outside of the voting phase
    const currentTime = get(now);
    const currentPhase = time.getCurrent({ now: currentTime });
    // So if it's not the voting phase, always return false
    if (currentPhase !== 'vote') return false;

    // Otherwise, check the status of all 3 stories
    const a = get(hasReadSubInPosition(1));
    const b = get(hasReadSubInPosition(2));
    const c = get(hasReadSubInPosition(3));
    return a && b && c;
  },
});
