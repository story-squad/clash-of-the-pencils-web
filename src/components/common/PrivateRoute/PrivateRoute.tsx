import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../../utils/tokenHelpers';

interface PrivateRouteProps {
  path: string;
  component: React.ComponentType;
}

const PrivateRoute = ({
  component: Component,
  ...props
}: PrivateRouteProps): React.ReactElement => {
  return (
    <Route
      {...props}
      render={() => {
        if (getToken()) return <Component />;
        else return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
