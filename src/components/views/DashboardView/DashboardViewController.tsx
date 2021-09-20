import React from 'react';
import { time } from '../../../utils';
import { SubmissionPhase } from './phases';

export default function DashboardViewController(): React.ReactElement {
  const currentPhase = time.getCurrent();

  switch (currentPhase) {
    case 'admin':
      return <></>;
    case 'stream':
      return <></>;
    case 'submit':
      return <SubmissionPhase />;
    case 'vote':
      return <></>;
    default:
      return <></>;
  }
}
