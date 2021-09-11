import { DateTime } from 'luxon';
import React from 'react';
import { ClockFaceLines } from '../../../assets';
import { Dial, Timer } from '../../atoms';
import './styles/index.scss';
import useCountdownCalculator from './useCountdownCalculator';

export interface ICountdownProps {
  endTime: DateTime;
  startTime: DateTime;
  now?: DateTime;
}

export default function Countdown(props: ICountdownProps): React.ReactElement {
  const [ratio, millisLeft] = useCountdownCalculator(props);
  return (
    <div className="countdown">
      <div className="clock-display">
        <Timer displayTime={millisLeft} />
        <span className="clock-display-text">Left to Vote</span>
      </div>
      <Dial angle={360 * ratio}>
        <div className="clock-face">
          <ClockFaceLines />
        </div>
      </Dial>
    </div>
  );
}
