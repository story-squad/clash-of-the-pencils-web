import { DateTime } from 'luxon';
import { APP_TIME_OFFSET } from '../../config';
import { printSchedule, schedule, ScheduleItem } from './schedule';
import {
  ClashPhases,
  eventType,
  LuxonWeekdays,
  TimeUntilItem,
} from './timeTypes';

interface GetCurrentPhaseParams {
  now?: DateTime;
  enableLogs?: boolean;
}

/* Helper Functions */
export function getCurrent({
  enableLogs = false,
  now = DateTime.utc().plus(APP_TIME_OFFSET),
}: GetCurrentPhaseParams = {}): eventType {
  const day = now.plus(0).weekday; // plus(0) is a hack to fix a bug I promise
  const isWeekend =
    day === LuxonWeekdays.Saturday || day === LuxonWeekdays.Sunday;
  if (isWeekend) return ClashPhases.off;

  // Create a scoped function to pass in schedule items to compare to `now`
  const isDuring = ({ start, end }: ScheduleItem): boolean => {
    return now >= start && now < end;
  };
  const phase = (() => {
    if (isDuring(schedule.submit)) {
      return ClashPhases.submit;
    } else if (isDuring(schedule.admin)) {
      return ClashPhases.admin;
    } else if (isDuring(schedule.vote)) {
      return ClashPhases.vote;
    } else if (isDuring(schedule.stream)) {
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
