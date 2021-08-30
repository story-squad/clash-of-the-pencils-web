import { Duration } from 'luxon';
import React, { useCallback, useMemo } from 'react';
import { time } from '../../../utils';
import './styles/index.scss';

export interface TimerProps {
  displayTime: time.TimeUntilItem | Duration;
}

export default function Timer({ displayTime }: TimerProps): React.ReactElement {
  const t = useCallback((item: string) => Math.abs(+item), []);
  const { h, m, s } = useMemo(() => {
    if (time.isTimeUntilItem(displayTime)) return displayTime;
    else {
      // Format as string, split string on colons, easy array destructure
      // THIS FIXED A BUG, getting the units off of the object didn't work
      const [h, m, s] = displayTime.toFormat('hh:mm:ss').split(':');
      // Cast the values as numbers
      return { h: t(h), m: t(m), s: t(s) };
    }
  }, [displayTime]);

  return (
    <div className="timer">
      <span className="item">
        {h < 10 && '0'}
        {h}
      </span>
      <span className="colon">:</span>
      <span className="item">
        {m < 10 && '0'}
        {m}
      </span>
      <span className="colon">:</span>
      <span className="item">
        {s < 10 && '0'}
        {s}
      </span>
    </div>
  );
}
