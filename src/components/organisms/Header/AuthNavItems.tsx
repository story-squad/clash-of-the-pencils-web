import { classnames } from '@story-squad/react-utils';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useHeaderContext from './useHeaderContext';
import { useAuth0 } from '@auth0/auth0-react';
import { IUser } from '../../../api/Users';
import { user } from '../../../state/authState';
import { useRecoilState } from 'recoil';

export default function AuthNavItems({
  className,
}: {
  className?: string;
} = {}): React.ReactElement {
  const { closeMenu } = useHeaderContext();
  const { loginWithRedirect, isAuthenticated, logout, getIdTokenClaims } =
    useAuth0();
  const auth0User = useAuth0().user;
  const [userInfo, setUserInfo] = useRecoilState(user);
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
        // break out into separate function
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
        setUserInfo(metadata);
      });
    }
  }, [isAuthenticated]);
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
      {auth0User ? (
        <>
          <li className={classnames('auth-nav', className)}>
            <span className="link">
              Welcome,{' '}
              <span className="codename">
                {userInfo?.codename ? userInfo.codename : auth0User.name}
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
