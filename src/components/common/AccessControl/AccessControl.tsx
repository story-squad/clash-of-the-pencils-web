import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCurrentEvent, eventTime } from '../../../utils/time';

interface AccessControlProps {
  event: eventTime;
}

const AccessControl = (
  props: AccessControlProps,
): React.ReactElement | null => {
  // Only redirect if the time of day doesn't match the event passed in
  return getCurrentEvent() === props.event ? null : (
    <Redirect to="/dashboard" />
  );
};

export default AccessControl;
