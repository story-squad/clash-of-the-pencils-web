import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Auth } from '../../api';
import { auth } from '../../state';

export interface PrivateRouteProps {
  // children: React.ComponentType<RouteComponentProps>;
  allowRole?: Auth.Roles;
  outlet: JSX.Element;
}

export default function PrivateRoute({
  outlet,
  allowRole,
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

  if (canAccess) {
    return <Navigate to="/login" replace />;
  }

  return outlet;

  // return (
  //   <Navigate to={`/?redirect=${redirectURL}`} replace />
  //   <Route
  //     {...routeProps}
  //     render={(props) =>
  //       canAccess ? <Component {...props} /> : <Redirect to="/login" />
  //     }
  //   />
  // );
}
