import { DateTime } from 'luxon';
import React from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

export default function CountdownContainer(): React.ReactElement {
  const endTimeISO = time.schedule.submit.end.toISOString();
  const endTime = DateTime.fromISO(endTimeISO);
  const startTimeISO = time.schedule.submit.start.toISOString();
  const startTime = DateTime.fromISO(startTimeISO);
  return <Countdown endTime={endTime} startTime={startTime} />;
}
