import { useEffect, useState } from 'react';

import { time } from '../../utils';

export const useCountdown = (event: time.eventType): useCountdownReturnType => {
  const { active: a, timeUntil: t } = time.getTimeUntilEvent(event);
  const [active, setActive] = useState(a);
  const [seconds, setSeconds] = useState(t);

  useEffect(() => {
    const timer = setInterval(() => {
      const { active: a2, timeUntil: t2 } = time.getTimeUntilEvent(event);
      setActive(a2);
      setSeconds(t2);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return {
    active,
    seconds,
    timeUntil: time.secondsToTime(seconds),
  };
};

interface useCountdownReturnType {
  active: boolean;
  seconds: number;
  timeUntil: time.TimeUntilItem;
}
