import React from 'react';

export interface TimerProps {
  prop1: unknown; // Remove this
}

export default function Timer(props: TimerProps): React.ReactElement {
  return <div>Test success!</div>;
}
