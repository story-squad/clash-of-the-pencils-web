import React, { useEffect, useMemo, useState } from 'react';

import { time } from '../../../utils';

/**
 * ## `Countdown.wrapper(event)(Component)`
 * To use the `Countdown.wrapper` function, call it with 2 sets of parens,
 * the first with the event type, and the second with the component you
 * would like to provide context to.
 *
 * #### Example:
 * ``` ts
 * Countdown.wrapper('submit')(PromptBox);
 * Countdown.wrapper('vote')(VotingPage);
 * ```
 */
export const wrapper = (event: time.eventType): wrapperType => (
  WrappedComponent: React.ComponentType<CountdownComponentProps>,
) =>
  function Countdown() {
    const [active, setActive] = useState(time.getTimeUntilEvent(event).active);
    const [secondsLeft, setSecondsLeft] = useState(
      time.getTimeUntilEvent(event).timeUntil,
    );
    const timeUntil = useMemo(() => time.secondsToTime(secondsLeft), [
      secondsLeft,
    ]);

    useEffect(() => {
      console.log(
        event,
        time.getTimeUntilEvent(event).active,
        time.schedule[event].start.format(),
        time.schedule[event].end.format(),
      );
      const countdown = setInterval(() => {
        setActive(time.getTimeUntilEvent(event).active);
        setSecondsLeft(time.getTimeUntilEvent(event).timeUntil);
      }, 500);
      return () => clearInterval(countdown);
    }, []);

    return (
      <WrappedComponent
        active={active}
        DisplayCountdown={() => <DisplayCountdown timeUntil={timeUntil} />}
      />
    );
  };

const DisplayCountdown = ({
  timeUntil,
}: {
  timeUntil: time.TimeUntilItem;
}): React.ReactElement => {
  return (
    <span className="countdown">
      {`${timeUntil.h < 10 ? '0' : ''}${timeUntil.h}:` +
        `${timeUntil.m < 10 ? '0' : ''}${timeUntil.m}:` +
        `${timeUntil.s < 10 ? '0' : ''}${timeUntil.s}`}
    </span>
  );
};

export interface CountdownComponentProps {
  active: boolean;
  DisplayCountdown: React.ComponentType;
}

/**
 * the `wrapper` function RETURNS a function that takes a `Component` as a parameter,
 * and provides countdown context to that component before returning it.
 */
type wrapperType = (
  WrappedComponent: React.ComponentType<CountdownComponentProps>,
) => React.FunctionComponent;
