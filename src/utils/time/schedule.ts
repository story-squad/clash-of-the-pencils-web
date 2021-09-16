import { DateTime } from 'luxon';
import { eventType } from './timeTypes';

/**
 * To convert a time to UTC, add 8 hours to PST or 5 hours to EST.
 * During daylight savings time, it's 7 and 4, respectively. Since we're
 * handling daylight savings time ourselves, _make sure_ you pay
 * attention to that last line! Don't want to be off by an hour.
 *
 * Anything that crosses PAST midnight the next day should continue at
 * 24 hours rather than resetting to 0, but if the event starts before/at 24
 * and ends at/past 0, the end time should reset back to 0 (probably). To test
 * it just start the server and make sure that the correct phase is logged!
 *
 * You can also change the offset in the [`appTimeOffset`](../../config/appTimeOffset.ts)
 * configuration file to test various other phases.
 */

// Schedule times...

const SCHEDULE_SUBMIT_START_HOUR = 0;
const SCHEDULE_SUBMIT_START_MIN = 30;
const SCHEDULE_SUBMIT_END_HOUR = 21;
const SCHEDULE_SUBMIT_END_MIN = 0;

const SCHEDULE_ADMIN_START_HOUR = 21;
const SCHEDULE_ADMIN_START_MIN = 0;
const SCHEDULE_ADMIN_END_HOUR = 21;
const SCHEDULE_ADMIN_END_MIN = 30;

const SCHEDULE_VOTE_START_HOUR = 21;
const SCHEDULE_VOTE_START_MIN = 30;
const SCHEDULE_VOTE_END_HOUR = 24;
const SCHEDULE_VOTE_END_MIN = 0;

const SCHEDULE_STREAM_START_HOUR = 24;
const SCHEDULE_STREAM_START_MIN = 0;
const SCHEDULE_STREAM_END_HOUR = 0;
const SCHEDULE_STREAM_END_MIN = 30;

/**
 * To add tracking for another time-based event, MAKE SURE you add it to the
 * `eventType` type object _as well as_ the schedule object
 */
export const schedule: Record<
  Exclude<eventType, 'off'>,
  { start: DateTime; end: DateTime }
> = {
  submit: {
    start: utcToLocal(SCHEDULE_SUBMIT_START_HOUR, SCHEDULE_SUBMIT_START_MIN),
    end: utcToLocal(SCHEDULE_SUBMIT_END_HOUR, SCHEDULE_SUBMIT_END_MIN),
  },
  admin: {
    start: utcToLocal(SCHEDULE_ADMIN_START_HOUR, SCHEDULE_ADMIN_START_MIN),
    end: utcToLocal(SCHEDULE_ADMIN_END_HOUR, SCHEDULE_ADMIN_END_MIN),
  },
  vote: {
    start: utcToLocal(SCHEDULE_VOTE_START_HOUR, SCHEDULE_VOTE_START_MIN),
    end: utcToLocal(SCHEDULE_VOTE_END_HOUR, SCHEDULE_VOTE_END_MIN),
  },
  stream: {
    start: utcToLocal(SCHEDULE_STREAM_START_HOUR, SCHEDULE_STREAM_START_MIN),
    end: utcToLocal(SCHEDULE_STREAM_END_HOUR, SCHEDULE_STREAM_END_MIN),
  },
};

/**
 * Converts a desired hour/minute value in UTC to the user's local time.
 * @param hour the UTC hour
 * @param minute the UTC minute
 */
export function utcToLocal(hour: number, minute: number): DateTime {
  // return moment(NOW)
  //   .hour(hour)
  //   .minute(minute)
  //   .seconds(0)
  //   .milliseconds(0)
  //   .local();
  return DateTime.fromObject({
    hour,
    minute,
    second: 0,
    millisecond: 0,
  }).toLocal();
}
