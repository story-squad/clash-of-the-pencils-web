import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { Link } from 'react-router-dom';
import useHeaderContext from './useHeaderContext';
import { useAuth0 } from '@auth0/auth0-react';

export default function AuthNavItems({
  className,
}: {
  className?: string;
} = {}): React.ReactElement {
  const { user, closeMenu } = useHeaderContext();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const handleLogoutClick = (): void => {
    logout({
      returnTo:
        process.env.REACT_APP_AUTH0_CLIENT_ORIGIN_URL ||
        'http://localhost:3000/',
    });
  };
  return user ? (
    <>
      <li className={classnames('auth-nav', className)}>
        <span className="link">
          Welcome, <span className="codename">{user.codename}</span>!
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
    <>
      <li className={classnames('auth-nav', className)}>
        {isAuthenticated ? (
          <p
            className={classnames('auth-nav', className)}
            onClick={handleLogoutClick}
          >
            Logout
          </p>
        ) : (
          <p
            className={classnames('auth-nav', className)}
            onClick={loginWithRedirect}
          >
            Log In
          </p>
        )}
      </li>
      <li className={classnames('auth-nav', className)}>
        <Link to="/signup" onClick={closeMenu}>
          Sign Up
        </Link>
      </li>
    </>
  );
}
