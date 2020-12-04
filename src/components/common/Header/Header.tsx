import React, { useMemo, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { nav } from '../../../config';
import { user } from '../../../state';

const Header = (): React.ReactElement => {
  const [showMenu, setShowMenu] = useState(false);
  const userId = useRecoilValue(user.userId);

  const menuItems = useMemo(
    () => (userId ? nav.siteNavItems : nav.landingNavItems),
    [userId],
  );

  const toggleMenu = () => {
    setShowMenu((cur) => !cur);
  };

  return (
    <>
      <header>
        <h2>Story Squad</h2>
        <MdMenu
          className={menuItems.length <= 0 ? 'hidden' : ''}
          onClick={toggleMenu}
        />
      </header>
      <div className="menu-container">
        <div className={`nav-menu${showMenu ? '' : ' hidden'}`}>
          {menuItems.map((item, i) => (
            <MenuItem
              key={i}
              {...item}
              clickHandler={() => setShowMenu(false)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <div className={`menu-item${props.primary ? ' primary' : ''}`}>
      <NavLink
        exact
        to={props.link}
        onClick={props.clickHandler}
        activeClassName="active"
      >
        {props.text}
      </NavLink>
    </div>
  );
};

interface MenuItemProps {
  link: string;
  text: string;
  primary?: boolean;
  clickHandler?: () => void | null;
}

export default Header;
