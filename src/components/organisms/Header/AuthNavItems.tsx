import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from '../../../api';
import { NavProps } from './types';

export interface AuthNavItemsProps extends NavProps {
  user?: Users.IUser;
}

export default function AuthNavItems({
  closeMenu,
  user,
}: AuthNavItemsProps): React.ReactElement {
  return user ? (
    <>
      <li>Welcome, {user.codename}</li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login" onClick={closeMenu}>
          Log In
        </Link>
      </li>
      <li>
        <Link to="/signup" onClick={closeMenu}>
          Sign Up
        </Link>
      </li>
    </>
  );
}
