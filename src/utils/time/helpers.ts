import { DateTime } from 'luxon';
import { getTimeUntilEvent } from './getTimeUntil';
import { schedule } from './schedule';
import { ClashPhases, ICurrentTime, TimeUntilItem } from './timeTypes';

/* Helper Functions */
// now is used only for testing
export function getCurrent(now?: DateTime): ICurrentTime {
  if (!now) now = DateTime.utc();

  const phase = (() => {
    if (now >= schedule.submit.start && now < schedule.submit.end) {
      return ClashPhases.submit;
    } else if (now >= schedule.admin.start && now < schedule.admin.end) {
      return ClashPhases.admin;
    } else if (now >= schedule.vote.start && now < schedule.vote.end) {
      return ClashPhases.vote;
    } else {
      return ClashPhases.stream;
    }
  })();

  // console.log('[PHASE]', now.toFormat('HH:mm:ss'), phase);

  // Should always be active
  const phaseInfo = getTimeUntilEvent(phase, now);

  return {
    phase,
    timeLeft: phaseInfo.timeUntil,
  };
}

/**
 * This function converts a given number of seconds into hour, minute,
 * second format for easier display.
 * @param sec the number of seconds to convert
 */
export const secondsToTime = (sec: number): TimeUntilItem => {
  const h = Math.floor(sec / 60 / 60);
  const m = Math.floor(sec / 60 - h * 60);
  const s = sec - h * 60 * 60 - m * 60;
  return { h, m, s };
};

/**
 * Returns the amount of time elapsed from `start` to `end` in seconds
 * @param start the start time of the interval
 * @param end the end time of the interval
 */
export const secondsElapsed = (start: DateTime, end: DateTime): number => {
  const endTime = DateTime.fromMillis(end.toMillis());
  /** If we cross over midnight, we need to increment end by a day. */
  if (endTime < start) endTime.plus({ day: 1 });

  const diff = end.diff(start);

  function msToS(ms: number) {
    const MS_IN_S = 1000;
    return ms / MS_IN_S;
  }

  const seconds = msToS(diff.toMillis());

  // console.log(
  //   '[DIFF]',
  //   diff.toFormat('HH:mm:ss'),
  //   start.toFormat('HH:mm:ss'),
  //   end.toFormat('HH:mm:ss'),
  //   seconds
  // );

  return seconds;
};
