import React, { useContext } from 'react';
import { FiAlertCircle, FiMenu, FiX } from 'react-icons/fi';
import HeaderContext from './headerContext';
import './styles/headerToggle.scss';

const CLASS_NAMES = {
  base: 'menu-toggle',
  mobile: 'mobile-icon',
  tablet: 'tablet-icon',
} as const;

export default function HeaderToggle(): React.ReactElement {
  const { toggleMenu: onClick, menuIsOpen } = useContext(HeaderContext);
  const c = (n: string) => `${CLASS_NAMES.base} ${n}`;
  const TabletIcon = menuIsOpen ? FiX : FiAlertCircle;
  const MobileIcon = menuIsOpen ? FiX : FiMenu;
  return (
    <>
      <TabletIcon {...{ onClick, className: c(CLASS_NAMES.tablet) }} />
      <MobileIcon {...{ onClick, className: c(CLASS_NAMES.mobile) }} />
    </>
  );
}
