import moment, { Moment } from 'moment';

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
 */
export type eventType = 'submit' | 'vote' | 'stream';
type scheduleObjectType = {
  [key in eventType]: {
    start: Moment;
    end: Moment;
  };
};

export const schedule: scheduleObjectType = {
  submit: {
    start: utcToLocal(1, 30),
    end: utcToLocal(22, 0),
  },
  vote: {
    start: utcToLocal(22, 30),
    end: utcToLocal(25, 0),
  },
  stream: {
    start: utcToLocal(25, 0),
    end: utcToLocal(25, 30),
  },
};

/**
 *
 */
export const getTimeUntilEvent = (
  event: eventType,
  now?: Moment,
): { active: boolean; timeUntil: number } => {
  if (!now) now = moment.utc();

  // Check if the event is CURRENTLY happening
  const active = now >= schedule[event].start && now < schedule[event].end;

  // If the event IS happening, calculate the time until the END time,
  // else calculate the time until the START time
  const difference = timeElapsed(
    now,
    schedule[event][active ? 'end' : 'start'],
  );

  // Calculate seconds until event begins/ends based on calculated difference
  const timeUntil =
    difference.seconds() + // read in actual seconds
    difference.minutes() * 60 + // add seconds from minutes
    difference.hours() * 60 * 60; // add seconds from hours

  return { active, timeUntil };
};

/**
 * Returns the amount of time elapsed from `start` to `end`
 * @param start the start time of the interval
 * @param end the end time of the interval
 */
const timeElapsed = (start: Moment, end: Moment): Moment => {
  if (end < start) end.add(1, 'day'); // This accounts for crossing over midnight
  const diff = moment.duration(end.diff(start));
  return moment.utc(+diff);
};

export interface TimeUntilItem {
  h: number;
  m: number;
  s: number;
}

export const secondsToTime = (sec: number): TimeUntilItem => {
  const h = Math.floor(sec / 60 / 60);
  const m = Math.floor(sec / 60 - h * 60);
  const s = sec - h * 3600 - m * 60;
  return { h, m, s };
};
