import { DateTime } from 'luxon';
import { APP_TIME_OFFSET } from '../../../config';
import { time } from '../../../utils';
import { ICountdownProps } from './Countdown';

export type UseCountdownCalculatorReturn = [
  ratio: number,
  timeLeftInMS: number,
];

export default function useCountdownCalculator({
  phase,
  ...params
}: ICountdownProps): UseCountdownCalculatorReturn {
  if (phase && phase === 'off') {
    const { start: endTime } = time.schedule.submit;
    const { end: startTime } = time.schedule.stream;
    return getDiff({
      endTime: endTime.plus({ day: 1 }),
      startTime,
      now: params.now,
    });
  } else return getDiff(params);
}

function getDiff({
  endTime,
  startTime,
  now = DateTime.utc().plus(APP_TIME_OFFSET),
}: Pick<
  ICountdownProps,
  'endTime' | 'startTime' | 'now'
>): UseCountdownCalculatorReturn {
  const diffTotalInMS = Math.abs(startTime.diff(endTime).milliseconds);
  const diffNowFromStartInMS = Math.abs(startTime.diff(now).milliseconds);
  const diffNowFromEndInMS = Math.abs(endTime.diff(now).milliseconds);
  const ratio = diffNowFromStartInMS / diffTotalInMS;
  return [ratio, diffNowFromEndInMS];
}
