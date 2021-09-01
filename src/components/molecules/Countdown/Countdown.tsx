import { DateTime } from 'luxon';
import React from 'react';
import { ClockFaceLines } from '../../../assets';
import { Dial, Timer } from '../../atoms';
import './styles/index.scss';

export interface ICountdownProps {
  endTime: DateTime;
  startTime: DateTime;
  now?: DateTime;
}

export default function Countdown({}: ICountdownProps): React.ReactElement {
  return (
    <div className="countdown">
      <div className="clock-display">
        <Timer displayTime={DateTime.now().diffNow()} />
        <span className="clock-display-text">Left to Vote</span>
      </div>
      <Dial angle={180}>
        <div className="clock-face">
          <ClockFaceLines />
        </div>
      </Dial>
    </div>
  );
}
