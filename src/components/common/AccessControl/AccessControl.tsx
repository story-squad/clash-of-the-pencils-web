import React from 'react';
import { Redirect } from 'react-router-dom';
import { time } from '../../../utils';

interface AccessControlProps {
  event: time.eventTime;
}

const AccessControl = (
  props: AccessControlProps,
): React.ReactElement | null => {
  // Only redirect if the time of day doesn't match the event passed in
  return time.getCurrentEvent() === props.event ? null : (
    <Redirect to="/dashboard" />
  );
};

export default AccessControl;
