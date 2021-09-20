import React from 'react';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { NavProps } from './types';

export default function NavItems({ user }: NavProps): React.ReactElement {
  return (
    <nav className="main-header-nav">
      <div className="spacer" />
      <ul>
        <li>
          <a>Daily Schedule</a>
        </li>
        <li>
          <a>Tutorial</a>
        </li>
        <li>
          {user ? (
            <a>
              <span className="text-version">My Account</span>
              <FiUser className="icon-version" />
            </a>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
