import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const Auth0Login = (): React.ReactElement => {
  const { loginWithRedirect, logout } = useAuth0();

  const handleLoginClick = (): void => {
    loginWithRedirect();
  };

  const handleLogoutClick = (): void => {
    logout({ returnTo: 'http://localhost:3000/auth0/auth0login' }); // must match the allowed logout URLs in Auth0 Dashboard
  };

  return (
    <>
      <button onClick={handleLoginClick}>Auth0 Log In</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </>
  );
};

export default Auth0Login;
