import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const Auth0LoginButton = (): React.ReactElement => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Auth0 Log In</button>;
};

export default Auth0LoginButton;
