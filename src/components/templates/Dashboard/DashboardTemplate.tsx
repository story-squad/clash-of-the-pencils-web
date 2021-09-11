import React from 'react';
import { Footer, Header, HeaderSwitcherProps } from '../../organisms';
import './styles/index.scss';

export default function DashboardTemplate({
  useStorySquadHeader = false,
  children,
}: React.PropsWithChildren<HeaderSwitcherProps>): React.ReactElement {
  return (
    <div className="dashboard-template">
      <Header useStorySquadHeader={useStorySquadHeader} />
      <div id="dashboard-content">
        <div className="dashboard-content-container">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
