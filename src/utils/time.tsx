import moment from 'moment';

// export const getInCurTimeZone = (time: Moment): Moment => {
//   const timeInUTC = time.utc();
//   const localOffset = moment().utcOffset() / 60;
//   const dstOffset = moment().isDST() ? 0 : 1;
//   return timeInUTC.add(localOffset, 'h').subtract(dstOffset, 'h');
// };

export const formatUTCToLocalTimestring = (time: string): string => {
  const d = moment().format('YYYY-MM-DD');
  return moment(d + ' ' + time)
    .utc(true)
    .local()
    .format('h:mm A');
};
