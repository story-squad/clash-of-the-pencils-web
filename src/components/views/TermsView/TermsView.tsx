import React from 'react';
import { TermsOfService } from '../../molecules';
import { DashboardTemplate } from '../../templates';

export default function TermsView(): React.ReactElement {
  return (
    <DashboardTemplate>
      <TermsOfService />
    </DashboardTemplate>
  );
}
