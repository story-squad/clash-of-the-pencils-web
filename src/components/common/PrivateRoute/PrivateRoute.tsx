import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { token } from '../../../utils/';

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
        if (token.get()) return <Component />;
        else return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
