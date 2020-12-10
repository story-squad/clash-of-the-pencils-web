import moment, { Moment } from 'moment';
import { scheduleObjectType, TimeUntilItem } from './timeTypes';

/**
 * Converts a desired hour/minute value in UTC to the user's local time.
 * @param hour the UTC hour
 * @param minute the UTC minute
 */
export const utcToLocal = (hour: number, minute: number): Moment => {
  return moment
    .utc()
    .hour(hour)
    .minute(minute)
    .seconds(0)
    .milliseconds(0)
    .local()
    .subtract(moment().isDST() ? 1 : 0, 'h');
};

// Schedule
/**
 * To convert a time to UTC, add 8 hours to PST or 5 hours to EST.
 * During daylight savings time, it's 7 and 4, respectively.
 *
 * To add tracking for another time-based event, MAKE SURE you add it to the
 * `eventType` type object _as well as_ the schedule object
 *
 * For SOME REASON when crossing over midnight the times get all wonky, so BOTH
 * times need to subtract 1 hour
 */
export const schedule: scheduleObjectType = {
  submit: {
    start: utcToLocal(1, 30), // should be 1, 30
    end: utcToLocal(22, 0), // should be 22, 0
  },
  vote: {
    start: utcToLocal(22, 30), // should be 22, 30
    end: utcToLocal(1, 30), // should be (1, 30)
  },
  stream: {
    start: utcToLocal(1, 0), // should be 1, 0
    end: utcToLocal(1, 30), // should be 1, 30
  },
  announce: {
    start: utcToLocal(1, 30), // should be 1 30
    end: utcToLocal(22, 0), // should be 22, 0
  },
};

/* Helper Functions */
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
export const secondsElapsed = (start: Moment, end: Moment): number => {
  if (end < start) end.add(1, 'day'); // This accounts for crossing over midnight
  const diff = moment.duration(end.diff(start));
  const span = moment.utc(+diff);
  return (
    span.seconds() + // read in actual seconds
    span.minutes() * 60 + // add seconds from minutes
    span.hours() * 60 * 60
  ); // add seconds from hours
};
