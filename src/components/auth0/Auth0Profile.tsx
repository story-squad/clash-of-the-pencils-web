import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

const Profile = (): React.ReactElement => {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const handleLogoutClick = (): void => {
    logout({ returnTo: 'http://localhost:3000/auth0/auth0login' }); // must match the allowed logout URLs in Auth0 Dashboard
  };

  // currently working on this function to get the user's metadata from Auth0. It currently causes the app to lose all user info
  // useEffect(() => {
  //   if (!isAuthenticated) return;
  //   const getUserMetadata = async () => {
  //     const domain = process.env.REACT_APP_AUTH0_DOMAIN;

  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: `https://${domain}/api/v2/`,
  //         scope: 'read:current_user',
  //       });

  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { user_metadata } = await metadataResponse.json();

  //       setUserMetadata(user_metadata);
  //     } catch (e) {
  //       let message = 'Unknown Error';
  //       if (e instanceof Error) message = e.message;
  //       console.warn({ message });
  //     }
  //   };

  //   getUserMetadata();
  // }, [getAccessTokenSilently, user?.sub, isAuthenticated]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <hr />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        'No user metadata defined'
      )}
      <hr />
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Profile;
