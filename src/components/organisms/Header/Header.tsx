import { useClickOutside } from '@story-squad/react-utils';
import React from 'react';
import HeaderIcon, { IHeaderIconProps } from './HeaderIcon';
import MobileNav from './MobileNav';
import './styles/index.scss';
import TabletNav from './TabletNav';

type IHeaderProps = IHeaderIconProps;

export default function Header({
  isMenuOpen,
  toggleMenu,
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
          <HeaderIcon isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <h1>Clash of the Pencils</h1>
          <TabletNav />
        </section>
        <MobileNav isMenuOpen={isMenuOpen} />
      </div>
    </header>
  );
}
