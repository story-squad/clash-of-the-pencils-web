import { Duration } from 'luxon';
import React, { useMemo } from 'react';
import { TUTORIAL_IDS } from '../../../config';
import { time } from '../../../utils';
import './styles/index.scss';

export interface TimerProps {
  displayTime: time.TimeUntilItem | Duration | number;
}

export default function Timer({ displayTime }: TimerProps): React.ReactElement {
  const { h, m, s } = useMemo(() => {
    if (time.isTimeUntilItem(displayTime)) return displayTime;
    else if (typeof displayTime === 'number') {
      // Then the number represents MILLIS
      const duration = Duration.fromMillis(displayTime);
      const [h, m, s] = duration
        .toFormat('hh:mm:ss')
        .split(':')
        .map(Number)
        .map(Math.abs);
      return { h, m, s };
    } else {
      // Format as string, split string on colons, easy array destructure
      // THIS FIXED A BUG, getting the units off of the object didn't work
      const [h, m, s] = displayTime
        .toFormat('hh:mm:ss')
        .split(':') // Convert to array oif number strings
        .map(Number) // Convert those strings to numbers
        .map(Math.abs); // Get the absolute value of those numbers
      // Cast the values as numbers
      return { h, m, s };
    }
  }, [displayTime]);

  return (
    <div className="timer">
      <span className="item">
        {h < 10 && '0'}
        {h}
      </span>
      <span className="colon">:</span>
      <span id={TUTORIAL_IDS.ID_TIMER} className="item">
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
