import React from 'react';
import { Footer, Header } from '../../organisms';
import { IDashboardTemplateProps } from './DashboardTemplate.model';

export default function DashboardTemplate({
  children,
}: React.PropsWithChildren<IDashboardTemplateProps>): React.ReactElement {
  return (
    <div className="dashboard-template">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
