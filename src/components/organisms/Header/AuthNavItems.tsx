import { classnames } from '@story-squad/react-utils';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from './headerContext';

export default function AuthNavItems({
  className,
}: {
  className?: string;
} = {}): React.ReactElement {
  const { user, closeMenu } = useContext(HeaderContext);
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
