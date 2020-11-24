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

export const getTimeUntilEvent = (
  event: eventType,
  now?: Moment,
): { active: boolean; timeUntil: Moment } => {
  if (!now) now = moment();

  // Check if the event is CURRENTLY happening
  const active = now > schedule[event].start && now < schedule[event].end;

  // If the event IS happening, return the time until the END time,
  // else return the time until the START time
  return {
    active,
    timeUntil: timeElapsed(now, schedule[event][active ? 'end' : 'start']),
  };
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
