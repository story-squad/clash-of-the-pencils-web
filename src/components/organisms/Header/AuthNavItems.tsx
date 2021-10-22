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
  return user ? (
    <>
      <li className={classnames('auth-nav', className)}>
        <span className="link"> Welcome, {user.codename}!</span>
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
    </>
  );
}
