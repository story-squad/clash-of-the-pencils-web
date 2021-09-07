import React, { useMemo } from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

export default function CountdownContainer(): React.ReactElement {
  const { end, start } = useMemo(() => time.schedule.submit, [time.schedule]);
  return <Countdown endTime={end} startTime={start} />;
}
