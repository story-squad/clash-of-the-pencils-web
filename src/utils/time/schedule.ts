import { DateTime } from 'luxon';
import { eventType, LuxonWeekdays } from './timeTypes';

/**
 * To convert a time to UTC, add 8 hours to PST (7 for PDT) or 5 hours to
 * EST (4 for EDT). Since we're handling daylight savings time ourselves,
 * _make sure_ you pay attention to that last line!
 *
 * Don't want to be off by an hour.
 */

// Schedule times...

const SCHEDULE_STREAM_START_HOUR = 0;
const SCHEDULE_STREAM_START_MIN = 0;
const SCHEDULE_STREAM_END_HOUR = 0;
const SCHEDULE_STREAM_END_MIN = 30;

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

const voteStart = utcFrom(SCHEDULE_VOTE_START_HOUR, SCHEDULE_VOTE_START_MIN);

// Memoize these as we use them twice
const submitStart = utcFrom(
  SCHEDULE_SUBMIT_START_HOUR,
  SCHEDULE_SUBMIT_START_MIN,
);
const streamEnd = utcFrom(SCHEDULE_STREAM_END_HOUR, SCHEDULE_STREAM_END_MIN);
/**
 * To add tracking for another time-based event, MAKE SURE you add it to the
 * `eventType` type object _as well as_ the schedule object
 */
export const schedule: Record<eventType, ScheduleItem> = {
  stream: {
    start: utcFrom(SCHEDULE_STREAM_START_HOUR, SCHEDULE_STREAM_START_MIN),
    end: streamEnd,
  },
  submit: {
    start: submitStart,
    end: utcFrom(SCHEDULE_SUBMIT_END_HOUR, SCHEDULE_SUBMIT_END_MIN),
  },
  admin: {
    start: utcFrom(SCHEDULE_ADMIN_START_HOUR, SCHEDULE_ADMIN_START_MIN),
    end: utcFrom(SCHEDULE_ADMIN_END_HOUR, SCHEDULE_ADMIN_END_MIN),
  },
  vote: {
    start: utcFrom(SCHEDULE_VOTE_START_HOUR, SCHEDULE_VOTE_START_MIN),
    end: utcFrom(SCHEDULE_VOTE_END_HOUR, SCHEDULE_VOTE_END_MIN),
  },
  off: {
    start: streamEnd.set({ weekday: LuxonWeekdays.Saturday }),
    end: voteStart.set({ weekday: LuxonWeekdays.Monday }),
  },
};
export interface ScheduleItem {
  start: DateTime;
  end: DateTime;
}

export function printSchedule(): void {
  console.groupCollapsed('[Clash Schedule]');
  console.log(
    '[SUBMIT]',
    schedule.submit.start.toFormat('HH:mm:ss'),
    schedule.submit.end.toFormat('HH:mm:ss'),
  );
  console.log(
    '[ADMIN]',
    schedule.admin.start.toFormat('HH:mm:ss'),
    schedule.admin.end.toFormat('HH:mm:ss'),
  );
  console.log(
    '[VOTE]',
    schedule.vote.start.toFormat('HH:mm:ss'),
    schedule.vote.end.toFormat('HH:mm:ss'),
  );
  console.log(
    '[STREAM]',
    schedule.stream.start.toFormat('HH:mm:ss'),
    schedule.stream.end.toFormat('HH:mm:ss'),
  );
  console.groupEnd();
}

/**
 * Converts a desired hour/minute value in UTC to the user's local time.
 * @param hour the UTC hour
 * @param minute the UTC minute
 */
export function utcFrom(hour: number, minute: number): DateTime {
  return DateTime.utc().set({
    hour,
    minute,
    second: 0,
    millisecond: 0,
  });
}
