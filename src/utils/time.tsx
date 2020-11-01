import moment, { Moment } from 'moment';

// export const getInCurTimeZone = (time: Moment): Moment => {
//   const timeInUTC = time.utc();
//   const localOffset = moment().utcOffset() / 60;
//   const dstOffset = moment().isDST() ? 0 : 1;
//   return timeInUTC.add(localOffset, 'h').subtract(dstOffset, 'h');
// };

export const getInCurTimeZone = (dt: string): Moment => {
  return moment(dt).utc(true).local();
};
