import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

export interface CountdownContainerProps {
  now?: DateTime;
  event: Exclude<time.eventType, 'off'>;
}

export default function CountdownContainer({
  now,
  event = 'submit',
}: CountdownContainerProps): React.ReactElement {
  const { end, start } = useMemo(
    () => time.schedule[event],
    [time.schedule, event],
  );
  return <Countdown endTime={end} startTime={start} now={now} />;
}
