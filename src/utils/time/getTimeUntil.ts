import moment, { Moment } from 'moment';
import { schedule, secondsElapsed } from './time';
import { eventType } from './timeTypes';

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
  if (!now) now = moment.utc().subtract(4, 'h');
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
