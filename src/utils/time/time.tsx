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
const schedule = {
  subStart: utcToLocal(3, 30).valueOf(),
  subEnd: utcToLocal(20, 0).valueOf(),
  delibStart: utcToLocal(20, 0).valueOf(),
  delibEnd: utcToLocal(20, 30).valueOf(),
  voteStart: utcToLocal(20, 30).valueOf(),
  voteEnd: utcToLocal(23, 0).valueOf(),
  streamStart: utcToLocal(23, 30).valueOf(),
  streamEnd: utcToLocal(24, 0).valueOf(),
  interimStart: utcToLocal(0, 0).valueOf(),
  interimEnd: utcToLocal(3, 30).valueOf(),
};

export type eventTime = 'SUBMIT' | 'DELIB' | 'VOTE' | 'STREAM' | 'NONE';
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
