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
  const e = schedule[event];
  let timeUntil, active;

  /**
   * Legend for charts:
   *  #  -> active
   *  -  -> inactive
   *  E  -> end
   *  S  -> start
   *  O  ->
   * < > -> span of time from midnight-midnight (utc)
   */
  if (e.start > e.end) {
    /**
     * This chart is aimed to help explain the branching logic of this function.
     *
     * 0h < ###### E ---------- S ###### > 24h
     *
     * When the start time of an event is AFTER the end time (for instance, when an event
     * begins at 22h UTC and ands at 2h UTC) the active time can be displayed like the
     * above timeline. If the current time is any time AFTER the start time or any time
     * BEFORE the end time (as displayed in the graph), then the event is active.
     */
    active = now >= e.start || now < e.end;
    if (active) {
      // Event is ACTIVE
      if (now < e.end) {
        /**
         * Here, we don't need to perform any special logic to find the time from
         * current to end, as displayed below:
         *
         * Example (where O is current time):
         *
         * 0h < ## O ## E ----- S ###### > 24h
         *         |----| <- this is the interval we want
         *
         * We can see above that all we need to do is calculate the interval from
         * current time to end time.
         */
        timeUntil = secondsElapsed(now, e.end);
      } else {
        /**
         * Here, we're adding a day to the end time IF the event is active AND if the
         * current time is AFTER the start time and BEFORE midnight UTC:
         *
         * Example (where O is current time):
         *
         * 0h < ##### E ----- S ### O ## > 24h
         *
         * To find an accurate interval from O to E, we NEED to add 24 hours to the
         * given end time to extend the timeline:
         *
         * 0h < ----- E ---------- S ### O ## > 24h < ###### E + 24h ---------- S + 24h ----- > 48h
         *                               |-------------------| <- this is the interval we want
         *
         * As you can see above, we're calculating the interval from the current time to the
         * end time TOMORROW, as the end time TODAY would be a negative interval.
         */
        timeUntil = secondsElapsed(now, moment(e.end).add(1, 'd'));
      }
    } else {
      /**
       * Here, again, nothing special going on (just that the event is INACTIVE).
       *
       * Example (where O is current time):
       *
       * 0h < ##### E -- O -- S ###### > 24h
       *                 |----| <- this is the interval we want
       *
       * We can see above that all we need to do is calculate the interval from
       * current time (O) to start time (S) to find the time until start.
       */
      timeUntil = secondsElapsed(now, e.start);
    }
  } else {
    /**
     * This branch is when an event does NOT cross midnight UTC
     *
     * 0h <------ S ########## E ------> 24h
     *
     * When the start time of an event is BEFORE the end time (starts at 1h UTC and ends at
     * 20h UTC) the active time can be displayed like the above timeline. If the current time
     * is AFTER the start time and BEFORE the end time (as displayed in the graph), then the
     * event is active.
     */
    active = now < e.end && now >= e.start;
    if (active) {
      /**
       * Here, again, nothing special going on (event is ACTIVE).
       *
       * Example (where O is current time):
       *
       * 0h <------ S ### O ### E ------> 24h
       *                  |-----| <- this is the interval we want
       *
       * We can see above that all we need to do is calculate the interval from
       * current time (O) to end time (E) to find the time until end.
       */
      timeUntil = secondsElapsed(now, e.end);
    } else {
      // Event is INACTIVE
      if (now >= e.end) {
        /**
         * Here, we're adding a day to the end time IF the event is inactive AND if the
         * current time is AFTER the end time and BEFORE midnight UTC:
         *
         * Example (where O is current time):
         *
         * 0h <------ S ###### E -- O --> 24h
         *
         * To find an accurate interval from O to S, we NEED to add 24 hours to the
         * given start time to extend the timeline:
         *
         * 0h <------ S ###### E -- O --> 24h <------ S + 24h ###### E + 24h ------> 48h
         *                          |-----------------| <- this is the interval we want
         *
         * As you can see above, we're calculating the interval from the current time to the
         * start time TOMORROW, as the start time TODAY would be a negative interval.
         */
        timeUntil = secondsElapsed(now, moment(e.start).add(1, 'd'));
      } else {
        /**
         * Here, again, nothing special going on (event is INACTIVE).
         *
         * Example (where O is current time):
         *
         * 0h <-- O --- S ####### E ------> 24h
         *        |-----| <- this is the interval we want
         *
         * We can see above that all we need to do is calculate the interval from
         * current time (O) to start time (S) to find the time until end.
         */
        timeUntil = secondsElapsed(now, e.start);
      }
    }
  }

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
