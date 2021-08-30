import { DateTime } from 'luxon';
import React from 'react';
import { Dial, Timer } from '../../atoms';

export interface ICountdownProps {
  endTime: DateTime;
  startTime: DateTime;
  now?: DateTime;
}

export default function Countdown({
  endTime,
  startTime,
  now = DateTime.now(),
}: ICountdownProps): React.ReactElement {
  const timeUntilEnd = now.diff(endTime);
  console.log(
    now.toFormat('HH:mm:ss'),
    startTime.toFormat('HH:mm:ss'),
    endTime.toFormat('HH:mm:ss'),
  );
  const gap = endTime.diff(startTime);

  let timeSinceStart = now.diff(startTime);
  if (timeSinceStart.milliseconds >= gap.milliseconds) {
    timeSinceStart = timeSinceStart.minus({ milliseconds: gap.milliseconds });
  }

  const ratio = timeSinceStart.milliseconds / gap.milliseconds;

  return (
    <div className="countdown">
      <Timer displayTime={timeUntilEnd} />
      <Dial angle={ratio} />
    </div>
  );
}
