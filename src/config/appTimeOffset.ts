import { DurationInput } from 'luxon';

/**
 * THIS DOESN'T WORK YET BUT I'M TRYING! DON'T USE THIS!
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
