import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Header = ({ menuItems = [] }: HeaderProps): React.ReactElement => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((cur) => !cur);
  };

  return (
    <>
      <header>
        <h2>Story Squad</h2>
        <MdMenu onClick={toggleMenu} />
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
      <Link to={props.link} onClick={props.clickHandler}>
        {props.text}
      </Link>
    </div>
  );
};

interface HeaderProps {
  menuItems?: MenuItemProps[];
}

interface MenuItemProps {
  link: string;
  text: string;
  primary?: boolean;
  clickHandler?: () => void | null;
}

export default Header;
