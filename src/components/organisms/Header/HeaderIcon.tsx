import React, { useMemo } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { ClashLogo } from '../../../assets';
import { IMobileNavProps } from './MobileNav';

export interface IHeaderIconProps extends IMobileNavProps {
  toggleMenu: () => void;
  openDashboard: () => void;
}

export default function HeaderIcon({
  isMenuOpen,
  toggleMenu,
  openDashboard,
}: IHeaderIconProps): React.ReactElement {
  const menuToggleProps = useMemo(
    () => ({
      className: 'menu-toggle',
      onClick: toggleMenu,
    }),
    [],
  );
  return (
    <>
      <ClashLogo className="logo" onClick={openDashboard} />
      {isMenuOpen ? (
        <FiX {...menuToggleProps} />
      ) : (
        <FiMenu {...menuToggleProps} />
      )}
    </>
  );
}
