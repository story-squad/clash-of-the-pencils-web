import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './tokenHelpers';

export const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        if (getToken()) return <Component {...props} />;
        else return <Redirect to="/" />;
      }}
    />
  );
};
