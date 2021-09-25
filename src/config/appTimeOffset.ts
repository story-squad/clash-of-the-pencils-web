import { DurationInput } from 'luxon';

/**
 * Make sure to set these variables to negative integers if you want to travel
 * back in time! the time is calculated using the `DateTime.plus` method!
 */

const APP_OFFSET_HOURS = 0;
const APP_OFFSET_MINUTES = 0;
const APP_OFFSET_SECONDS = 0;

export const APP_TIME_OFFSET: DurationInput = {
  hours: APP_OFFSET_HOURS,
  minutes: APP_OFFSET_MINUTES,
  seconds: APP_OFFSET_SECONDS,
};
