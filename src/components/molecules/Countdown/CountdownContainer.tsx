import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

export interface CountdownContainerProps {
  now?: DateTime;
}

export default function CountdownContainer({
  now,
}: CountdownContainerProps): React.ReactElement {
  const { end, start } = useMemo(() => time.schedule.submit, [time.schedule]);
  return <Countdown endTime={end} startTime={start} now={now} />;
}
