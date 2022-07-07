import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { Link } from 'react-router-dom';
import useHeaderContext from './useHeaderContext';

export default function AuthNavItems({
  className,
}: {
  className?: string;
} = {}): React.ReactElement {
  const { user, closeMenu } = useHeaderContext();

  const clientId = process.env.REACT_APP_FUSIONAUTH_CLIENT_ID;
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
      <li className={classnames('auth-nav', className)}>
        <a
          href={`https://storysquad.fusionauth.io/oauth2/logout?client_id=${clientId}`}
        >
          Fusionauth Logout
        </a>
      </li>
    </>
  ) : (
    <>
      <li className={classnames('auth-nav', className)}>
        <Link to="/login" onClick={closeMenu}>
          Log In
        </Link>
      </li>
      <li className={classnames('auth-nav', className)}>
        <Link to="/signup" onClick={closeMenu}>
          Sign Up
        </Link>
      </li>
      <li className={classnames('auth-nav', className)}>
        <a
          href={`https://storysquad.fusionauth.io/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000`}
        >
          FusionAuth Login
        </a>
      </li>
    </>
  );
}
