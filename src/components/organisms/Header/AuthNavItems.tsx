import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from './headerContext';

export default function AuthNavItems(): React.ReactElement {
  const { user, closeMenu } = useContext(HeaderContext);
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
