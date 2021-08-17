import React from 'react';
import HeaderIcon from './HeaderIcon';
import MobileNav from './MobileNav';
import './styles/index.scss';
import TabletNav from './TabletNav';

export default function Header(): React.ReactElement {
  return (
    <header>
      <section id="main-header">
        <HeaderIcon />
        <h1>Clash of the Pencils</h1>
        <TabletNav />
      </section>
      <MobileNav />
    </header>
  );
}
