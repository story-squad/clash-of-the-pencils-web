import { useClickOutside } from '@story-squad/react-utils';
import React from 'react';
import { Users } from '../../../api';
import HeaderIcon, { IHeaderIconProps } from './HeaderIcon';
import MobileNav from './MobileNav';
import './styles/index.scss';
import TabletNav from './TabletNav';

type IHeaderProps = Omit<IHeaderIconProps, 'closeMenu'> & {
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
  function headingClickHandler() {
    closeMenuIfOpen();
    openDashboard();
  }

  return (
    <header className="main-header-wrapper" ref={clickRef}>
      <div className="main-header-container">
        <section id="main-header">
          <HeaderIcon
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            openDashboard={openDashboard}
            closeMenu={closeMenuIfOpen}
          />
          <h1 onClick={headingClickHandler}>Clash of the Pencils</h1>
          <TabletNav user={user} closeMenu={closeMenuIfOpen} />
        </section>
        <MobileNav
          isMenuOpen={isMenuOpen}
          user={user}
          closeMenu={closeMenuIfOpen}
        />
      </div>
    </header>
  );
}
