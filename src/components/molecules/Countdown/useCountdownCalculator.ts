import { DateTime } from 'luxon';
import { APP_TIME_OFFSET } from '../../../config';
import { ICountdownProps } from './Countdown';

export type UseCountdownCalculatorReturn = [
  ratio: number,
  timeLeftInMS: number,
];

export default function useCountdownCalculator({
  endTime,
  startTime,
  now = DateTime.utc().plus(APP_TIME_OFFSET),
}: ICountdownProps): UseCountdownCalculatorReturn {
  const diffTotalInMS = Math.abs(startTime.diff(endTime).milliseconds);
  // this was used in ration it is now not because it was demmed necessary to flip it
  // const diffNowFromStartInMS = Math.abs(startTime.diff(now).milliseconds);
  const diffNowFromEndInMS = Math.abs(endTime.diff(now).milliseconds);
  const ratio = diffNowFromEndInMS / diffTotalInMS;
  return [ratio, diffNowFromEndInMS];
}
