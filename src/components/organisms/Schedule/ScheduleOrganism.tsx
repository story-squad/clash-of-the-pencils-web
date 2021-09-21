import React from 'react';
import { greenBulletPoint, scheduleBackground } from '../../../assets';
import { Button } from '../../atoms';
import scheduleData from './scheduleData';
import './styles/index.scss';

export interface ScheduleOrganismProps {
  openDashboard: () => void;
}

export default function ScheduleOrganism({
  openDashboard,
}: ScheduleOrganismProps): React.ReactElement {
  return (
    <section
      className="schedule-wrapper"
      style={{ backgroundImage: `url(${scheduleBackground})` }}
    >
      <div className="schedule-container">
        <div className="schedule-container-content">
          <h2>Daily Schedule</h2>
          {scheduleData.map((data, i) => (
            <ScheduleItem key={i} {...data} />
          ))}
          <div className="disclaimer">
            *All times are displayed in your local timezone
          </div>
        </div>
        <Button onClick={openDashboard}>Back to Dashboard</Button>
      </div>
    </section>
  );
}

function ScheduleItem({
  text,
  title,
}: {
  text: string;
  title: string;
}): React.ReactElement {
  return (
    <div className="schedule-item">
      <div className="left-content">
        <img src={greenBulletPoint} />
      </div>
      <div className="right-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
