import React from 'react';

export default function NavItems(): React.ReactElement {
  return (
    <nav className="main-header-nav">
      <ul>
        <li>
          <a>Daily Schedule</a>
        </li>
        <li>
          <a>Tutorial</a>
        </li>
        <li>
          <a>My Account</a>
        </li>
      </ul>
    </nav>
  );
}
