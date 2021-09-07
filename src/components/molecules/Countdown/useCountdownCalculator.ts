import { DateTime } from 'luxon';
import { ICountdownProps } from './Countdown';

export type UseCountdownCalculatorReturn = [
  ratio: number,
  timeLeftInMS: number,
];

export default function useCountdownCalculator({
  endTime,
  startTime,
  now = DateTime.utc(),
}: ICountdownProps): UseCountdownCalculatorReturn {
  const diffTotalInMS = Math.abs(startTime.diff(endTime).milliseconds);
  const diffNowInMS = Math.abs(startTime.diff(now).milliseconds);
  const ratio = diffNowInMS / diffTotalInMS;
  return [ratio, diffNowInMS];
}
