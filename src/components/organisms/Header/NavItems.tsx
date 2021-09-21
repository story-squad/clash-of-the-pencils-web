import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../state';
import { NavProps } from './types';

export default function NavItems(props: NavProps): React.ReactElement {
  return (
    <nav className="main-header-nav">
      <div className="spacer" />
      <ul>
        {/* TODO add back in later */}
        <li>
          <Link to="/schedule">Daily Schedule</Link>
        </li>
        {/* <li>
          <a>Tutorial</a>
        </li> */}
        <NavAuthControl {...props} />
      </ul>
    </nav>
  );
}

function NavAuthControl({ user }: NavProps): React.ReactElement {
  const setAuthValues = useSetRecoilState(auth.login);
  const logout = useCallback(() => {
    setAuthValues(undefined);
  }, [setAuthValues]);
  return user ? (
    <>
      <li onClick={logout}>
        <a>Logout</a>
      </li>
      {/* <li>
        <a>
          <span className="text-version">My Account</span>
          <FiUser className="icon-version" />
        </a>
      </li> */}
    </>
  ) : (
    <>
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </>
  );
}
