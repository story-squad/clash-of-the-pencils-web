import React, { useMemo } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Auth } from '../../api';
import { auth } from '../../state';

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
  allowRole?: Auth.Roles;
}

export default function PrivateRoute({
  component: Component,
  allowRole,
  ...routeProps
}: PrivateRouteProps): React.ReactElement {
  const isLoggedIn = useRecoilValue(auth.isLoggedIn);
  const user = useRecoilValue(auth.user);
  const canAccess = useMemo(() => {
    if (allowRole === undefined) return isLoggedIn;
    else
      return (
        isLoggedIn &&
        (user?.roleId === Auth.Roles.admin || user?.roleId === allowRole)
      );
  }, [user, allowRole]);

  return (
    <Route
      {...routeProps}
      render={(props) =>
        canAccess ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
