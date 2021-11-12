import { classnames, useClickOutside } from '@story-squad/react-utils';
import React from 'react';
import AppNavItems from './AppNavItems';
import AuthNavItems from './AuthNavItems';
import NavLogout from './NavLogout';
import NavTutorial from './NavTutorial';
import './styles/headerMenu.scss';
import useHeaderContext from './useHeaderContext';

export default function HeaderMenu(): React.ReactElement {
  const { menuIsOpen, closeMenu } = useHeaderContext();

  const [ref] = useClickOutside({
    onClick: closeMenu,
    isActive: menuIsOpen,
  });

  return (
    <div className={classnames('header-menu', !menuIsOpen && 'collapsed')}>
      <nav ref={ref}>
        <ul>
          <AuthNavItems />
          <NavTutorial />
          <AppNavItems className="hide-on-tablet" />
          <NavLogout />
        </ul>
      </nav>
    </div>
  );
}
