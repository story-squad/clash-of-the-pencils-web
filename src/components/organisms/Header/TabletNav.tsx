import React from 'react';
import NavItems from './NavItems';
import './styles/tabletNav.scss';

export default function TabletNav(): React.ReactElement {
  return (
    <div className="tablet-nav">
      <NavItems />
    </div>
  );
}
