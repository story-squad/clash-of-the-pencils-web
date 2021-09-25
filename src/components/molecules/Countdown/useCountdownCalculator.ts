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
  const diffNowFromStartInMS = Math.abs(startTime.diff(now).milliseconds);
  const diffNowFromEndInMS = Math.abs(endTime.diff(now).milliseconds);
  const ratio = diffNowFromStartInMS / diffTotalInMS;
  return [ratio, diffNowFromEndInMS];
}
