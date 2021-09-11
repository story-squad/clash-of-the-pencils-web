import React, { useEffect, useMemo, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { auth } from '../../../state';
import { time } from '../../../utils';
import './styles/index.scss';

const Header = (): React.ReactElement => {
  const [showMenu, setShowMenu] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const isLogged = useRecoilValue(auth.isLoggedIn);

  const setAuthOpen = useSetRecoilState(auth.authModalOpen);
  const setAuthIsLogin = useSetRecoilState(auth.authModalIsLogin);
  const setSignupWasSuccessful = useSetRecoilState(auth.signupWasSuccessful);
  const setAuthIsLogout = useSetRecoilState(auth.authModalIsLogout);

  const menuItems = useMemo<headerItems[]>(() => {
    const navItems = [{ link: '/', text: 'Home' }];
    if (gameActive) navItems.push({ link: '/game', text: 'Game' });
    if (isLogged) navItems.push({ link: '/profile', text: 'Profile' });
    navItems.push({ link: '/results', text: 'Results' });
    return navItems;
  }, [isLogged]);

  const toggleMenu = () => {
    setShowMenu((cur) => !cur);
  };

  const openLogin = () => {
    setAuthOpen(true);
    setAuthIsLogin(true);
    setSignupWasSuccessful(false);
  };

  const openSignup = () => {
    setAuthOpen(true);
    setAuthIsLogin(false);
    setSignupWasSuccessful(false);
  };

  const openLogout = () => {
    setAuthOpen(true);
    setAuthIsLogout(true);
    setSignupWasSuccessful(false);
  };

  useEffect(() => {
    let gameTimer: NodeJS.Timeout;
    if (!gameActive)
      gameTimer = setInterval(() => {
        setGameActive(time.getTimeUntilEvent('offTime').active);
      }, 1000);

    return () => clearInterval(gameTimer);
  }, []);

  return (
    <>
      <header>
        <h2>
          <Link to="/">Story Squad</Link>
        </h2>
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
          {isLogged ? (
            <div className="menu-item">
              <span className="link" onClick={openLogout}>
                Sign Out
              </span>
            </div>
          ) : (
            <>
              <div className="menu-item">
                <span className="link" onClick={openLogin}>
                  Sign In
                </span>
              </div>
              <div className="menu-item">
                <span className="link" onClick={openSignup}>
                  Sign Up
                </span>
              </div>
            </>
          )}
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

type headerItems = {
  link: string;
  text: string;
};

export default Header;
