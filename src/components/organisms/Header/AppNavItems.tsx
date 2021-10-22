import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from './headerContext';

export default function AppNavItems(): React.ReactElement {
  const { closeMenu } = useContext(HeaderContext);
  return (
    <>
      <li>
        <Link to="/winners" onClick={closeMenu}>
          View Winners
        </Link>
      </li>
      <li>
        <Link to="/schedule" onClick={closeMenu}>
          Daily Schedule
        </Link>
      </li>
    </>
  );
}
