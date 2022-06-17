import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useEffect } from 'react';

const Profile = (): React.ReactElement => {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();
  const handleLogoutClick = (): void => {
    logout({ returnTo: 'http://localhost:3000/auth0/auth0login' }); // must match the allowed logout URLs in Auth0 Dashboard
  };
  useEffect(() => {
    const accessToken = getAccessTokenSilently();
    axios
      .post(
        'http://localhost:8000/api/auth/auth0Login',
        {
          email: user?.email,
        },
        { headers: { Authorization: `Bearer: ${accessToken}` } },
      ) // need to attach JWT from Auth0 to the request as bearer token
      .then((res) => console.log(res.data));
  }, []);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (isAuthenticated) {
    return (
      <div>
        <img src={user?.picture} alt={user?.name} />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    );
  }
  return <div>User not authenticated</div>;
};

export default Profile;
