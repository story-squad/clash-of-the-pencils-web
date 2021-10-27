import React from 'react';
import { useOpenDashboard } from '../../../hooks';
import { Schedule } from '../../organisms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export default function ScheduleView(): React.ReactElement {
  const openDashboard = useOpenDashboard();
  return (
    <DashboardTemplate>
      <Schedule openDashboard={openDashboard} />
    </DashboardTemplate>
  );
}
