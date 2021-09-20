import React from 'react';
import NavItems from './NavItems';
import './styles/tabletNav.scss';
import { NavProps } from './types';

export default function TabletNav({ user }: NavProps): React.ReactElement {
  return (
    <div className="tablet-nav">
      <NavItems user={user} />
    </div>
  );
}
