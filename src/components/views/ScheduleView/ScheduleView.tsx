import React from 'react';
import { Schedule } from '../../organisms';
import { ScheduleOrganismProps } from '../../organisms/Schedule/ScheduleOrganism';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export default function ScheduleView({
  openDashboard,
}: ScheduleOrganismProps): React.ReactElement {
  return (
    <DashboardTemplate>
      <Schedule openDashboard={openDashboard} />
    </DashboardTemplate>
  );
}
