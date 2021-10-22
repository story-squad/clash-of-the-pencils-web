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
      <li className={classnames('app-nav', className)}>
        Welcome, {user.codename}
      </li>
    </>
  ) : (
    <>
      <li className={classnames('app-nav', className)}>
        <Link to="/login" onClick={closeMenu}>
          Log In
        </Link>
      </li>
      <li className={classnames('app-nav', className)}>
        <Link to="/signup" onClick={closeMenu}>
          Sign Up
        </Link>
      </li>
    </>
  );
}
