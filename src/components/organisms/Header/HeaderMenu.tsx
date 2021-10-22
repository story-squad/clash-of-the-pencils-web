import { classnames } from '@story-squad/react-utils';
import React from 'react';
import AppNavItems from './AppNavItems';
import AuthNavItems from './AuthNavItems';
import NavLogout from './NavLogout';
import './styles/headerMenu.scss';
import useHeaderContext from './useHeaderContext';

export default function HeaderMenu(): React.ReactElement {
  const { menuIsOpen } = useHeaderContext();
  return (
    <div className={classnames('header-menu', !menuIsOpen && 'collapsed')}>
      <nav>
        <ul>
          <AuthNavItems />
          <AppNavItems className="hide-on-tablet" />
          <NavLogout />
        </ul>
      </nav>
    </div>
  );
}
