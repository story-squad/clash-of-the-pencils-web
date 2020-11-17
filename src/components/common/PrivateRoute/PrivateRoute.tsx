import React, { useEffect, useMemo } from 'react';
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
  const [username, setUsername] = useRecoilState(user.username);
  const userToken = useMemo(() => token.get(), []);

  useEffect(() => {
    if (!userId) {
      const id = token.get('userId');
      if (typeof id === 'number') setUserId(id);
    }
    if (!username) {
      const usr = token.get('username');
      if (typeof usr === 'string') setUsername(usr);
    }
  }, []);

  return (
    <Route
      {...props}
      render={() => (userId || userToken ? <Component /> : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
