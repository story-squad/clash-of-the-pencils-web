import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '../../../utils/ErrorBoundary';
import { Tutorial } from '../../atoms';
import { Footer, Header, HeaderSwitcherProps } from '../../organisms';
import DashboardErrorFallback from './DashboardErrorFallback';
import './styles/index.scss';

export default function DashboardTemplate({
  useStorySquadHeader = false,
  children,
  className,
}: React.PropsWithChildren<
  HeaderSwitcherProps & {
    className?: string;
  }
>): React.ReactElement {
  return (
    <div className={classnames('dashboard-template', className)}>
      <Routes>
        <Route path="/" element={<Tutorial />} />
      </Routes>
      <Header useStorySquadHeader={useStorySquadHeader} />
      <div id="dashboard-content">
        <div className="dashboard-content-container">
          <ErrorBoundary fallback={DashboardErrorFallback}>
            {children}
          </ErrorBoundary>
        </div>
      </div>
      <Footer />
    </div>
  );
}
