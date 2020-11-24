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
    start: utcToLocal(3, 30),
    end: utcToLocal(20, 0),
  },
  vote: {
    start: utcToLocal(20, 30),
    end: utcToLocal(23, 0),
  },
  stream: {
    start: utcToLocal(23, 0),
    end: utcToLocal(23, 30),
  },
};

/**
 * This function returns an `active` property which, if `true`, means that an
 * event is currently happening and the `timeUntil` value is the time until the
 * event ENDS, not begins. If `active` is false, `timeUntil` is the amount of
 * time until the event begins. `timeUntil` is the amount of time IN SECONDS.
 *
 * When using this function, don't pass in a second parameter. The `now` param
 * is there for testing purposes only.
 */
export const getTimeUntilEvent = (
  event: eventType,
  now?: Moment,
): { active: boolean; timeUntil: number } => {
  if (!now) now = moment.utc();

  // Check if the event is CURRENTLY happening
  const active = now > schedule[event].start && now < schedule[event].end;

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
