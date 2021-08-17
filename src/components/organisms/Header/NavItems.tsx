import React from 'react';
import { FiUser } from 'react-icons/fi';

export default function NavItems(): React.ReactElement {
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
          <a>
            <span className="text-version">My Account</span>
            <FiUser className="icon-version" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
