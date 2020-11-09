import moment, { Moment } from 'moment';

export const utcToLocal = (hour: number, minute: number): Moment => {
  return moment
    .utc()
    .hour(hour)
    .minute(minute)
    .local()
    .subtract(moment().isDST() ? 1 : 0, 'h');
};

// Schedule

// Store UTC timecodes in the schedule object
const schedule: { [key: string]: Moment } = {
  subStart: utcToLocal(3, 30),
  subEnd: utcToLocal(20, 0),
  delibStart: utcToLocal(20, 0),
  delibEnd: utcToLocal(20, 30),
  voteStart: utcToLocal(20, 30),
  voteEnd: utcToLocal(23, 0),
  streamStart: utcToLocal(23, 30),
  streamEnd: utcToLocal(24, 0),
};

export type eventTime = 'SUBMIT' | 'DELIB' | 'VOTE' | 'STREAM' | 'NONE';
export const getCurrentEvent = (now?: Moment): eventTime => {
  if (!now) now = moment.utc();
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
