import moment, { Moment } from 'moment';

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
 */
export const schedule: scheduleObjectType = {
  submit: {
    start: utcToLocal(1, 30), // should be 1, 30
    end: utcToLocal(22, 0), // should be 22, 0
  },
  vote: {
    start: utcToLocal(22, 30).subtract(1, 'day'), // should be 22, 30
    end: utcToLocal(25, 0).subtract(1, 'day'), // should be 25, 0
  },
  stream: {
    start: utcToLocal(25, 0), // should be 25, 0
    end: utcToLocal(25, 30), // should be 25, 30
  },
  announce: {
    start: utcToLocal(25, 30),
    // the end time needs to be decided amongst the team as to when we should stop showing the winner. should it reset at midnight?
    end: utcToLocal(20, 30),
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
  const s = sec - h * 3600 - m * 60;
  return { h, m, s };
};

/**
 * This function is used in conjunction with the `Countdown` component and the `useCountdown`
 * hook to restrict certain features of the app based on the time of day.
 *
 * You pass in the name of the event that you'd like to track, and the function calculates
 * whether the event is currently `active`
 *
 * If `active`, the value in `timeUntil` will be the time until the event ends. If the event
 * is NOT active, the value in `timeUntil` will be the time until the event begins.
 *
 * @param event the special key of the event you want to track
 * @param now DO NOT use this except for testing purposes, this will set the current
 * time in calculations to something other than the current time
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
  const timeUntil = secondsElapsed(
    now,
    schedule[event][active ? 'end' : 'start'],
  );

  return { active, timeUntil };
};

/**
 * Returns the amount of time elapsed from `start` to `end` in seconds
 * @param start the start time of the interval
 * @param end the end time of the interval
 */
const secondsElapsed = (start: Moment, end: Moment): number => {
  if (end < start) end.add(1, 'day'); // This accounts for crossing over midnight
  const diff = moment.duration(end.diff(start));
  const span = moment.utc(+diff);
  return (
    span.seconds() + // read in actual seconds
    span.minutes() * 60 + // add seconds from minutes
    span.hours() * 60 * 60
  ); // add seconds from hours
};

/* Important Time Module Types */
/**
 * The `nametags` for time-based events we track using union syntax
 */
export type eventType = 'submit' | 'vote' | 'stream' | 'announce';

/**
 * An interface for a seconds value converted into hours, minutes, seconds
 *
 * ex: `{ h, m, s }`
 */
export interface TimeUntilItem {
  h: number;
  m: number;
  s: number;
}

/**
 * A type for the larger schedule object on which we track time-based events
 */
type scheduleObjectType = {
  [key in eventType]: {
    start: Moment;
    end: Moment;
  };
};
