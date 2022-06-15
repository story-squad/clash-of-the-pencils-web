import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const Auth0Login = (): React.ReactElement => {
  const { loginWithRedirect } = useAuth0();

  const handleLoginClick = (): void => {
    loginWithRedirect();
  };

  return <button onClick={handleLoginClick}>Auth0 Log In</button>;
};

export default Auth0Login;
