import { classnames } from '@story-squad/react-utils';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from './headerContext';

export default function AppNavItems({
  className,
}: {
  className?: string;
} = {}): React.ReactElement {
  const { closeMenu } = useContext(HeaderContext);
  return (
    <>
      <li className={classnames('app-nav', className)}>
        <Link to="/winners" onClick={closeMenu}>
          View Winners
        </Link>
      </li>
      <li className={classnames('app-nav', className)}>
        <Link to="/schedule" onClick={closeMenu}>
          Daily Schedule
        </Link>
      </li>
    </>
  );
}
