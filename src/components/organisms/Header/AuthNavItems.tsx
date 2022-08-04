import { classnames } from '@story-squad/react-utils';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useHeaderContext from './useHeaderContext';
import { useAuth0 } from '@auth0/auth0-react';
import { IUser } from '../../../api/Users';

export default function AuthNavItems({
  className,
}: {
  className?: string;
} = {}): React.ReactElement {
  const { closeMenu } = useHeaderContext();
  const { loginWithRedirect, isAuthenticated, logout, user, getIdTokenClaims } =
    useAuth0();
  const [userMetadata, setUserMetadata] = useState<IUser>();
  useEffect(() => {
    if (isAuthenticated) {
      console.log(
        '%cUser is authenticated, getting user metadata...',
        'color: #3BB143; font-weight: bold;',
      );
      getIdTokenClaims().then((claims) => {
        console.groupCollapsed(
          '%cClaims %c🡇 ',
          'color: #F9C70C',
          'color: #007AAF',
        );
        console.table(claims);
        console.groupEnd();
        const metadata: IUser = {
          codename: claims?.codename,
          created_at: claims?.created_at,
          dob: claims?.dob,
          email: claims?.email || '',
          firstname: claims?.firstname,
          isValidated: claims?.isValidated,
          lastname: claims?.lastname,
          roleId: claims?.role_id,
          id: claims?.id,
          updated_at: new Date(),
          password: '',
        };
        setUserMetadata(metadata);
      });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (userMetadata !== undefined) {
      console.groupCollapsed(
        '%cUser metadata %c🡇',
        'color: #F4BC1C',
        'color: #007AAF',
      );
      console.table(userMetadata);
      console.groupEnd();
    }
    // set recoil state with metadata
  }, [userMetadata]);
  const handleLogoutClick = (): void => {
    logout({
      returnTo:
        process.env.REACT_APP_AUTH0_CLIENT_ORIGIN_URL ||
        'http://localhost:3000/',
    });
  };
  return (
    <>
      <li className={classnames('auth-nav', className)}>
        {isAuthenticated ? (
          <button
            className={classnames('auth-nav', className)}
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        ) : (
          <button
            className={classnames('auth-nav', className)}
            onClick={loginWithRedirect}
          >
            Log In
          </button>
        )}
      </li>
      {user ? (
        <>
          <li className={classnames('auth-nav', className)}>
            <span className="link">
              Welcome,{' '}
              <span className="codename">
                {userMetadata?.codename ? userMetadata.codename : user.name}
              </span>
              !
            </span>
          </li>
          <li className={classnames('auth-nav', className)}>
            <Link to="/account" onClick={closeMenu}>
              My Account
            </Link>
          </li>
          <li className={classnames('auth-nav', className)}>
            <Link to="/stories" onClick={closeMenu}>
              My Stories
            </Link>
          </li>
        </>
      ) : (
        <li className={classnames('auth-nav', className)}>
          <Link to="/signup" onClick={closeMenu}>
            Sign Up
          </Link>
        </li>
      )}
    </>
  );
}
