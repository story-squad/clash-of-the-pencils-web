import moment, { Moment } from 'moment';

/**
 * This function displays the correct local time based off of an
 * input UTC timecode (hh:mm). It accounts for DST as well.
 * @param time a UTC time string formatted as 'HH:MM'
 * @returns a local time string formatted as 'h:mm A'
 */
export const formatUTCToLocalTimestring = (time: string): string => {
  const d = moment().format('YYYY-MM-DD');
  return moment
    .utc(d + ' ' + time)
    .local()
    .subtract(moment().isDST() ? 1 : 0, 'h') // Subtract an hour during daylight savings
    .format('h:mm A');
};

// Schedule
/**
 * Takes a time
 * @param hour integer of the UTC hour
 * @param minute integer of the UTC minutes
 */
const makeScheduleTime = (hour: number, minute: number): number => {
  // Create a UTC timecode based on the passed in hour and minute
  const now = moment.utc().hour(hour).minute(minute);
  // Subtract an hour during DST for consistency against UTC
  const dstAdjusted = now.subtract(moment().isDST() ? 1 : 0, 'h');
  // Return a unix timecode
  return dstAdjusted.valueOf();
};

// Store UTC timecodes in the schedule object
const schedule = {
  subStart: makeScheduleTime(3, 30),
  subEnd: makeScheduleTime(20, 0),
  delibStart: makeScheduleTime(20, 0),
  delibEnd: makeScheduleTime(20, 30),
  voteStart: makeScheduleTime(20, 30),
  voteEnd: makeScheduleTime(23, 0),
  streamStart: makeScheduleTime(23, 30),
  streamEnd: makeScheduleTime(24, 0),
  interimStart: makeScheduleTime(0, 0),
  interimEnd: makeScheduleTime(3, 30),
};

type eventTime = 'SUBMIT' | 'DELIB' | 'VOTE' | 'STREAM' | 'NONE';
export const getCurrentEvent = (time?: Moment): eventTime => {
  if (!time) time = moment();
  const now = time.utc().valueOf();
  if (now >= schedule.subStart && now < schedule.subEnd) {
    return 'SUBMIT';
  } else if (now >= schedule.delibStart && now < schedule.delibEnd) {
    return 'DELIB';
  } else if (now >= schedule.voteStart && now < schedule.voteEnd) {
    return 'VOTE';
  } else if (now >= schedule.streamStart && now < schedule.streamEnd) {
    return 'STREAM';
  } else {
    return 'NONE';
  }
};
