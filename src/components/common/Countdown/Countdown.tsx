import React from 'react';
import { useCountdown } from '../../../hooks';

import { time } from '../../../utils';

const Countdown = (props: CountdownProps): React.ReactElement => {
  const { timeUntil } = useCountdown(props.toEvent);
  return (
    <span className="countdown">
      {`${timeUntil.h < 10 ? '0' : ''}${timeUntil.h}:` +
        `${timeUntil.m < 10 ? '0' : ''}${timeUntil.m}:` +
        `${timeUntil.s < 10 ? '0' : ''}${timeUntil.s}`}
    </span>
  );
};

interface CountdownProps {
  toEvent: time.eventType;
}

export default Countdown;
