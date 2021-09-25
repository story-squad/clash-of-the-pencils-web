import { DateTime } from 'luxon';
import { APP_TIME_OFFSET } from '../../config';
import { printSchedule, schedule } from './schedule';
import { ClashPhases, eventType, TimeUntilItem } from './timeTypes';

/* Helper Functions */
export function getCurrent(params?: {
  now?: DateTime;
  enableLogs?: boolean;
}): Exclude<eventType, 'off'> {
  const { enableLogs = false, now = DateTime.now().plus(APP_TIME_OFFSET) } =
    params || {};

  function isNowBetween({
    start,
    end,
  }: {
    start: DateTime;
    end: DateTime;
  }): boolean {
    return now >= start && now < end;
  }

  const phase = (() => {
    if (isNowBetween(schedule.submit)) {
      return ClashPhases.submit;
    } else if (isNowBetween(schedule.admin)) {
      return ClashPhases.admin;
    } else if (isNowBetween(schedule.vote)) {
      return ClashPhases.vote;
    } else if (isNowBetween(schedule.stream)) {
      return ClashPhases.stream;
    } else return ClashPhases.submit;
  })();

  enableLogs && console.log('[PHASE]', now.toFormat('HH:mm:ss'), phase);
  enableLogs && printSchedule();

  return phase;
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
