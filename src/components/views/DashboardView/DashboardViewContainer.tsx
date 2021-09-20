import React from 'react';
import { time } from '../../../utils';
import DashboardView from './DashboardView';

export default function DashboardViewContainer(): React.ReactElement {
  const phase = time.getCurrent();

  return <DashboardView phase={phase} />;
}
