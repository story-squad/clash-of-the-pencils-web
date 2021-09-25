import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { app } from '../../../state';
import { time } from '../../../utils';
import Countdown from './Countdown';

export interface CountdownContainerProps {
  now?: DateTime;
  phase: Exclude<time.eventType, 'off'>;
}

export default function CountdownContainer(): React.ReactElement {
  const now = useRecoilValue(app.now);
  const phase = useRecoilValue(app.phase);
  const { end, start } = useMemo(
    () => time.schedule[phase],
    [time.schedule, phase],
  );
  return <Countdown endTime={end} startTime={start} now={now} phase={phase} />;
}
