import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

export interface CountdownContainerProps {
  now?: DateTime;
  phase: Exclude<time.eventType, 'off'>;
}

export default function CountdownContainer({
  now,
  phase = 'submit',
}: CountdownContainerProps): React.ReactElement {
  const { end, start } = useMemo(
    () => time.schedule[phase],
    [time.schedule, phase],
  );
  return <Countdown endTime={end} startTime={start} now={now} phase={phase} />;
}
