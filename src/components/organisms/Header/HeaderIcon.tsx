import React, { useCallback, useMemo } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { ClashLogo } from '../../../assets';

export interface IHeaderIconProps extends IMobileNavProps {
  toggleMenu: () => void;
  openDashboard: () => void;
}

export default function HeaderIcon({
  isMenuOpen,
  toggleMenu,
  openDashboard,
  closeMenu,
}: IHeaderIconProps): React.ReactElement {
  const menuToggleProps = useMemo(
    () => ({
      className: 'menu-toggle',
      onClick: toggleMenu,
    }),
    [],
  );

  const clickHandler = useCallback(() => {
    openDashboard();
    closeMenu();
  }, [openDashboard, closeMenu]);

  return (
    <>
      <ClashLogo className="logo" onClick={clickHandler} />
      {isMenuOpen ? (
        <FiX {...menuToggleProps} />
      ) : (
        <FiMenu {...menuToggleProps} />
      )}
    </>
  );
}
