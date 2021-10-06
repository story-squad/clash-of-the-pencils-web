import { IErrorFallbackProps } from '@story-squad/react-utils/dist/utils/ErrorBoundary/types';
import React from 'react';
import { errorDragon } from '../../../assets';
import { Button, Picture } from '../../atoms';
import './styles/dashboardErrorFallback.scss';

export default function DashboardErrorFallback({
  error,
}: IErrorFallbackProps): React.ReactElement {
  const reload = () => window.location.reload();
  return (
    <div className="dashboard-error-fallback">
      <h2>Uh Oh!</h2>
      <p>Something went wrong:</p>
      <p>{error.message}</p>
      <Picture
        source={errorDragon}
        description="Blaze the dragon in a box"
        disablePreview
      />
      <Button onClick={reload}>Reload Dashboard</Button>
    </div>
  );
}
