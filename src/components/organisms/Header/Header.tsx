import { useClickOutside } from '@story-squad/react-utils';
import React, { useContext } from 'react';
import { ClashLogo } from '../../../assets';
import HeaderContext from './headerContext';
import HeaderToggle from './HeaderToggle';
import './styles/index.scss';

export default function Header(): React.ReactElement {
  const { menuIsOpen, openDashboard, closeMenu } = useContext(HeaderContext);
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
        <section id="main-header">
          <HeaderToggle />
          <ClashLogo className="logo" onClick={closeMenuAndOpenDash} />
          <h1 onClick={closeMenuAndOpenDash}>Clash of the Pencils</h1>
        </section>
      </div>
    </header>
  );
}
