import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { user } from '../../../state';
import { token } from '../../../utils/';

interface PrivateRouteProps {
  path: string;
  component: React.ComponentType;
}

const PrivateRoute = ({
  component: Component,
  ...props
}: PrivateRouteProps): React.ReactElement => {
  const [userId, setUserId] = useRecoilState(user.userId);

  return (
    <Route
      {...props}
      render={() => {
        // If user is already being tracked in recoil state, proceed
        if (userId) return <Component />;

        // Otherwise attempt to load user ID
        const id = token.get('userId');
        if (typeof id === 'number') {
          setUserId(id);
          return <Component />;
        } else return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
