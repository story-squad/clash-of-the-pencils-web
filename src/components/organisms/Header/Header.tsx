import { useClickOutside } from '@story-squad/react-utils';
import React from 'react';
import { Users } from '../../../api';
import HeaderIcon, { IHeaderIconProps } from './HeaderIcon';
import MobileNav from './MobileNav';
import './styles/index.scss';
import TabletNav from './TabletNav';

type IHeaderProps = IHeaderIconProps & {
  user?: Omit<Users.IUser, 'password'> | undefined;
  openDashboard: () => void;
};

export default function Header({
  isMenuOpen,
  toggleMenu,
  user,
  openDashboard,
}: IHeaderProps): React.ReactElement {
  // Menu should close on click outside of header
  const [clickRef] = useClickOutside({
    isActive: isMenuOpen,
    onClick: closeMenuIfOpen,
  });
  function closeMenuIfOpen() {
    if (isMenuOpen) toggleMenu();
  }

  return (
    <header className="main-header-wrapper" ref={clickRef}>
      <div className="main-header-container">
        <section id="main-header">
          <HeaderIcon
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            openDashboard={openDashboard}
          />
          <h1 onClick={openDashboard}>Clash of the Pencils</h1>
          <TabletNav user={user} />
        </section>
        <MobileNav isMenuOpen={isMenuOpen} user={user} />
      </div>
    </header>
  );
}
