import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './tokenHelpers';

interface PrivateRouteProps {
  component: React.ComponentType;
}

export const PrivateRoute = ({
  component: Component,
  ...props
}: PrivateRouteProps): React.ReactElement => {
  return (
    <Route
      {...props}
      render={() => {
        if (getToken()) return <Component {...props} />;
        else return <Redirect to="/" />;
      }}
    />
  );
};
