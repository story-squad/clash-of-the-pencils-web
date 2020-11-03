import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCurrentEvent, eventTime } from '../../../utils/time';

interface AccessControlProps {
  page: eventTime;
}

const AccessControl = (
  props: AccessControlProps,
): React.ReactElement | null => {
  // Only redirect if the time of day doesn't match the page passed in
  return getCurrentEvent() === props.page ? null : <Redirect to="/dashboard" />;
};

export default AccessControl;
