import { DateTime } from 'luxon';
import { atom, selector } from 'recoil';
import { time } from '../../utils';

export const now = atom<DateTime>({
  key: 'appAtomCurrentDateTime',
  default: selector({
    key: 'appNowDefaultSelector',
    get: () => DateTime.now().minus({ minute: 2, second: 30 }),
  }),
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const interval = setInterval(
        () => setSelf(DateTime.now().minus({ minute: 2, second: 30 })),
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
