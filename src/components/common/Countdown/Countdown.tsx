import React from 'react';

import { time } from '../../../utils';

const Countdown = (props: CountdownProps): React.ReactElement => {
  return (
    <span className="countdown">
      {`${props.timeUntil.h < 10 ? '0' : ''}${props.timeUntil.h}:` +
        `${props.timeUntil.m < 10 ? '0' : ''}${props.timeUntil.m}:` +
        `${props.timeUntil.s < 10 ? '0' : ''}${props.timeUntil.s}`}
    </span>
  );
};

interface CountdownProps {
  timeUntil: time.TimeUntilItem;
}

export default Countdown;
