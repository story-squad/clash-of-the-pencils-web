import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Profile = (): React.ReactElement => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (user && isAuthenticated) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  }
  return <div>User not authenticated</div>;
};

export default Profile;
