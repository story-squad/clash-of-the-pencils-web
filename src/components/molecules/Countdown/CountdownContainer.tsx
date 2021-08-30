import { DateTime } from 'luxon';
import React from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

export default function CountdownContainer(): React.ReactElement {
  const endTimeISO = time.schedule.submit.end.toISO();
  const endTime = DateTime.fromISO(endTimeISO);
  return <Countdown endTime={endTime} />;
}
