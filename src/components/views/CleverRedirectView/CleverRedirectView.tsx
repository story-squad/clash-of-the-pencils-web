import React from 'react';
import { DragonLoader } from '../../molecules';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export default function CleverRedirectView(): React.ReactElement {
  return (
    <DashboardTemplate className="clever-redirect-view">
      <DragonLoader message="Authorizing with Clever" />
    </DashboardTemplate>
  );
}
