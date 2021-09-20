import { classnames } from '@story-squad/react-utils';
import React from 'react';
import NavItems from './NavItems';
import './styles/mobileNav.scss';
import { NavProps } from './types';

export interface IMobileNavProps extends NavProps {
  isMenuOpen: boolean;
}

export default function MobileNav({
  isMenuOpen,
  user,
}: IMobileNavProps): React.ReactElement {
  return (
    <div className={classnames('mobile-nav', !isMenuOpen && 'collapsed')}>
      <NavItems user={user} />
    </div>
  );
}
