import React from 'react';
import { Footer, Header } from '../../organisms';
import { IDashboardTemplateProps } from './DashboardTemplate.model';
import './styles/index.scss';

export default function DashboardTemplate({
  children,
}: React.PropsWithChildren<IDashboardTemplateProps>): React.ReactElement {
  return (
    <div className="dashboard-template">
      <Header />
      <div id="dashboard-content">{children}</div>
      <Footer />
    </div>
  );
}
