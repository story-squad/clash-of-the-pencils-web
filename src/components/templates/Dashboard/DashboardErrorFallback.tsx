import React from 'react';
import { errorDragon } from '../../../assets';
import { useExpiredAuthHandlerModal } from '../../../hooks';
import { IErrorFallbackProps } from '../../../utils/ErrorBoundary/types';
import { Button, Picture } from '../../atoms';
import './styles/dashboardErrorFallback.scss';

export default function DashboardErrorFallback({
  error,
}: IErrorFallbackProps): React.ReactElement {
  const [modal, message] = useExpiredAuthHandlerModal(error);

  return (
    <div className="dashboard-error-fallback">
      {modal}
      <h2>Uh Oh!</h2>
      <p>Something went wrong:</p>
      <p>{message}</p>
      <Picture
        source={errorDragon}
        description="Blaze the dragon in a box"
        disablePreview
      />
      <Button onClick={window.location.reload}>Reload Dashboard</Button>
    </div>
  );
}
