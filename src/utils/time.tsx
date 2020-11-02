import moment from 'moment';

/**
 * This function takes a local time
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
