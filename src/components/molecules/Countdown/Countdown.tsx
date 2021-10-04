import { DateTime } from 'luxon';
import React, { useEffect, useMemo } from 'react';
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

  // This code aims to force a page refresh when stream time starts
  // This is a hack to fix a bug. Seems to work
  // (Infinite loop danger, but I think it's been avoided correctly?)
  const memoizedPhase = useMemo(() => phase, []);
  useEffect(() => {
    if (memoizedPhase !== 'stream' && phase === 'stream') {
      console.log('Forcing page reload...');
      window.location.reload();
    }
  }, [phase]);

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
