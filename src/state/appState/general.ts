import { DateTime } from 'luxon';
import { atom, selector } from 'recoil';
import { APP_TIME_OFFSET } from '../../config';
import { time } from '../../utils';

export const now = atom<DateTime>({
  key: 'appAtomCurrentDateTime',
  default: selector({
    key: 'appNowDefaultSelector',
    get: () => DateTime.now().plus(APP_TIME_OFFSET),
  }),
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const interval = setInterval(
        () => setSelf(DateTime.now().plus(APP_TIME_OFFSET)),
        1000,
      );
      return () => clearInterval(interval);
    },
  ],
});

export const phase = selector<Exclude<time.eventType, 'off'>>({
  key: 'appPhaseSelector',
  get: ({ get }) => {
    const curTime = get(now);
    return time.getCurrent({ now: curTime });
  },
});
