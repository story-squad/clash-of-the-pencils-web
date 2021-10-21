import React from 'react';
import { Link } from 'react-router-dom';
import { NavProps } from './types';

export type AppNavItemsProps = NavProps;

export default function AppNavItems({
  closeMenu,
}: AppNavItemsProps): React.ReactElement {
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
