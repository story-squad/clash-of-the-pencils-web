import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Profile = (): React.ReactElement => {
  const { user, isLoading, logout, isAuthenticated } = useAuth0();
  localStorage.setItem('user', JSON.stringify(user));
  const handleLogoutClick = (): void => {
    logout({ returnTo: 'http://localhost:3000/auth0/auth0login' }); // must match the allowed logout URLs in Auth0 Dashboard
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <hr />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <hr />
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  ) : (
    <div>You are not logged in.</div>
  );
};

export default Profile;
