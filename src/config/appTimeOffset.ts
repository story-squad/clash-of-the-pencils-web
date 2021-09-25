import { DurationInput } from 'luxon';

/**
 * Make sure to set these variables to negative integers if you want to travel
 * back in time! the time is calculated using the `DateTime.plus` method!
 *
 * Also, keep in mind there may be some strange unintended effects when using
 * these offsets! They are not perfected yet, and cause some small issues for
 * certain large time jumps.
 */

const APP_OFFSET_HOURS = 0;
const APP_OFFSET_MINUTES = 0;
const APP_OFFSET_SECONDS = 0;

const isProduction = process.env.NODE_ENV === 'production';

export const APP_TIME_OFFSET: DurationInput = {
  hours: isProduction ? 0 : APP_OFFSET_HOURS,
  minutes: isProduction ? 0 : APP_OFFSET_MINUTES,
  seconds: isProduction ? 0 : APP_OFFSET_SECONDS,
};
