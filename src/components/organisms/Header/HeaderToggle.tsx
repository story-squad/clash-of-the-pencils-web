import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import './styles/headerToggle.scss';
import useHeaderContext from './useHeaderContext';

const CLASS_NAMES = {
  base: 'menu-toggle',
  mobile: 'mobile-icon',
  tablet: 'tablet-icon',
} as const;

export default function HeaderToggle(): React.ReactElement {
  const { toggleMenu: onClick, menuIsOpen } = useHeaderContext();
  const c = (n: string) =>
    classnames(CLASS_NAMES.base, n, menuIsOpen && 'menu-is-open');
  const TabletIcon = FaUserCircle;
  const MobileIcon = menuIsOpen ? FiX : FiMenu;
  return (
    <>
      <TabletIcon {...{ onClick, className: c(CLASS_NAMES.tablet) }} />
      <MobileIcon {...{ onClick, className: c(CLASS_NAMES.mobile) }} />
    </>
  );
}
