import React from 'react';
import { ClashLogo } from '../../../assets';
import HeaderMenu from './HeaderMenu';
import HeaderToggle from './HeaderToggle';
import InlineNav from './InlineNav';
import './styles/index.scss';
import useHeaderContext from './useHeaderContext';

export default function Header(): React.ReactElement {
  const { openDashboard, closeMenu } = useHeaderContext();
  function closeMenuAndOpenDash() {
    closeMenu();
    openDashboard();
  }

  return (
    <header className="main-header-wrapper">
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
