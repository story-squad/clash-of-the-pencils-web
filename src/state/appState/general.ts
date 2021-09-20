import { DateTime } from 'luxon';
import { atom, selector } from 'recoil';

export const now = atom<DateTime>({
  key: 'appAtomCurrentDateTime',
  default: selector({
    key: 'appNowDefaultSelector',
    get: DateTime.now,
  }),
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const interval = setInterval(() => setSelf(DateTime.now), 1000);
      return () => clearInterval(interval);
    },
  ],
});
