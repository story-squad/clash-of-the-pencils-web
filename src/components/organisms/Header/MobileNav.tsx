import { classnames } from '@story-squad/react-utils';
import React from 'react';
import NavItems from './NavItems';

export interface IMobileNavProps {
  isMenuOpen: boolean;
}

export default function MobileNav({
  isMenuOpen,
}: IMobileNavProps): React.ReactElement {
  return (
    <div className={classnames('mobile-nav', !isMenuOpen && 'collapsed')}>
      <NavItems />
    </div>
  );
}
