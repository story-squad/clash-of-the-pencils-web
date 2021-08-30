import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { time } from '../../../utils';
import './styles/index.scss';

export interface TimerProps {
  endTime: time.TimeUntilItem | DateTime;
}

export default function Timer({ endTime }: TimerProps): React.ReactElement {
  const { h, m, s } = useMemo(() => {
    if (time.isTimeUntilItem(endTime)) return endTime;
    else {
      return { h: endTime.hour, m: endTime.minute, s: endTime.second };
    }
  }, [endTime]);
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
