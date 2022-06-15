import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const Auth0Login = (): React.ReactElement => {
  const { loginWithRedirect, logout } = useAuth0();

  const handleLoginClick = (): void => {
    loginWithRedirect();
  };

  const handleLogoutClick = (): void => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <>
      <button onClick={handleLoginClick}>Auth0 Log In</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </>
  );
};

export default Auth0Login;
