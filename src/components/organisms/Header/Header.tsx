import { useClickOutside } from '@story-squad/react-utils';
import React from 'react';
import { ClashLogo } from '../../../assets';
import HeaderMenu from './HeaderMenu';
import HeaderToggle from './HeaderToggle';
import InlineNav from './InlineNav';
import './styles/index.scss';
import useHeaderContext from './useHeaderContext';

export default function Header(): React.ReactElement {
  const { menuIsOpen, openDashboard, closeMenu } = useHeaderContext();
  // Menu should close on click outside of header
  const [clickRef] = useClickOutside({
    isActive: menuIsOpen,
    onClick: closeMenu,
  });
  function closeMenuAndOpenDash() {
    closeMenu();
    openDashboard();
  }

  return (
    <header className="main-header-wrapper" ref={clickRef}>
      <div className="main-header-container">
        <HeaderToggle />
        <section id="main-header">
          <ClashLogo className="logo" onClick={closeMenuAndOpenDash} />
          <h1 onClick={closeMenuAndOpenDash}>Clash of the Pencils</h1>
        </section>
        <InlineNav />
      </div>
      <HeaderMenu />
    </header>
  );
}
