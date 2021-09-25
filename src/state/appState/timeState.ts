import { DateTime } from 'luxon';
import { atom, selector } from 'recoil';
import { APP_TIME_OFFSET } from '../../config';
import { time } from '../../utils';
import { recalculate } from '../effects';

function getCurrentTimeWithOffset() {
  return DateTime.now().plus(APP_TIME_OFFSET);
}

export const now = atom<DateTime>({
  key: 'appAtomCurrentDateTime',
  default: selector({
    key: 'appNowDefaultSelector',
    get: getCurrentTimeWithOffset,
  }),
  effects_UNSTABLE: [recalculate(getCurrentTimeWithOffset)],
});

export const phase = selector<Exclude<time.eventType, 'off'>>({
  key: 'appPhaseSelector',
  get: ({ get }) => {
    const curTime = get(now);
    const phase = time.getCurrent({ now: curTime });
    return phase;
  },
});
