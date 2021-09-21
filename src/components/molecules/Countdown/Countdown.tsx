import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { ClockFaceLines } from '../../../assets';
import { time } from '../../../utils';
import { Dial, Timer } from '../../atoms';
import './styles/index.scss';
import useCountdownCalculator from './useCountdownCalculator';

export interface ICountdownProps {
  endTime: DateTime;
  startTime: DateTime;
  now?: DateTime;
  phase?: time.eventType;
}

export default function Countdown({
  phase = 'vote',
  ...props
}: ICountdownProps): React.ReactElement {
  const [ratio, millisLeft] = useCountdownCalculator(props);

  const countdownText = useMemo(() => {
    switch (phase) {
      case 'admin':
        return 'Until Voting Starts';
      case 'stream':
        return 'Streaming Now';
      case 'submit':
        return 'Left to Submit';
      case 'vote':
        return 'Left to Vote';
    }
  }, [phase]);

  return (
    <div className="countdown">
      <div className="clock-display">
        <Timer displayTime={millisLeft} />
        <span className="clock-display-text">{countdownText}</span>
      </div>
      <Dial angle={360 * ratio}>
        <div className="clock-face">
          <ClockFaceLines />
        </div>
      </Dial>
    </div>
  );
}
