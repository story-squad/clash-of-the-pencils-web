import { DateTime } from 'luxon';
import { atom, selector } from 'recoil';
import { APP_TIME_OFFSET } from '../../config';
import { time } from '../../utils';
import { LuxonWeekdays } from '../../utils/time';
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
  effects_UNSTABLE: [recalculate(getCurrentTimeWithOffset, 1)],
});

export const phase = selector<Exclude<time.eventType, 'off'>>({
  key: 'appPhaseSelector',
  get: ({ get }) => {
    const curTime = get(now);
    const phase = time.getCurrent({ now: curTime });
    return phase;
  },
});

/**
 * This selector looks at the UTC start time of our app submissions, which aligns
 * pretty cleanly with the start of a UTC day, except for the 30 minute streamt time.
 * Our stream time lines
 */
export const isWeekend = selector<boolean>({
  key: 'isWeekendSelector',
  get: ({ get }) => {
    const n = get(now);
    return (
      n.weekday === LuxonWeekdays.Sunday ||
      (n.weekday === LuxonWeekdays.Saturday && !isStreamTime(n)) ||
      (n.weekday === LuxonWeekdays.Monday &&
        n.hour < time.schedule.stream.end.hour)
    );
  },
});

function isStreamTime(now: DateTime): boolean {
  const { end, start } = time.schedule.stream;
  return now >= start && now < end;
}
