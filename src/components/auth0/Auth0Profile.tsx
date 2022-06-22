import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';

const Profile = (): React.ReactElement => {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const handleLogoutClick = (): void => {
    logout({ returnTo: 'http://localhost:3000/auth0/auth0login' }); // must match the allowed logout URLs in Auth0 Dashboard
  };
  // currently working on this function to get the user's metadata from Auth0
  // useEffect(() => {
  //   const accessToken = getAccessTokenSilently();
  //   axios
  //     .post(
  //       'http://localhost:8000/api/auth/auth0Login',
  //       {
  //         email: user?.email,
  //       },
  //       { headers: { Authorization: `Bearer: ${accessToken}` } },
  //     ) // need to attach JWT from Auth0 to the request as bearer token
  //     .then((res) => console.log(res.data));
  // }, []);
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        let message = 'Unknown Error';
        if (e instanceof Error) message = e.message;
        console.log({ message });
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (isAuthenticated) {
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
  }
  return <div>User not authenticated</div>;
};

export default Profile;
