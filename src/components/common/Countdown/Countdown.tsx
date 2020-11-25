import React from 'react';

import { time } from '../../../utils';

export const Component = ({
  component: Component,
  event,
}: CountdownProps): React.ReactElement => {
  const { active, timeUntil } = time.getTimeUntilEvent(event);

  return active ? (
    <Component timeUntil={timeUntil} />
  ) : (
    <div className="countdown">
      COUNTING: {timeUntil.h}h {timeUntil.m}m {timeUntil.s}s
    </div>
  );
};

interface CountdownProps {
  component: React.ComponentType<CountdownComponentProps>;
  event: time.eventType;
}

export interface CountdownComponentProps {
  timeUntil: time.TimeUntilItem;
}
