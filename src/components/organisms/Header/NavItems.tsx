import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useConfirmationModal } from '../../../hooks';
import { auth } from '../../../state';
import { NavProps } from './types';

export default function NavItems(props: NavProps): React.ReactElement {
  return (
    <nav className="main-header-nav">
      <div className="spacer" />
      <ul>
        {props.user && <li>Welcome, {props.user.codename}!</li>}
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

  const [modal, confirmLogout] = useConfirmationModal({
    message: 'Are you sure you want to log out',
    cancelText: 'No',
    confirmText: 'Yes',
    onConfirm: logout,
  });

  return user ? (
    <>
      {modal}
      <li onClick={confirmLogout}>
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
