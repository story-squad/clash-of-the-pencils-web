import { classnames } from '@story-squad/react-utils';
import axios, { AxiosInstance } from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import useHeaderContext from './useHeaderContext';

export default function AuthNavItems({
  className,
}: {
  className?: string;
} = {}): React.ReactElement {
  interface AxiosGeneratorProps {
    timeoutInSeconds?: number;
  }
  const { user, closeMenu } = useHeaderContext();
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
  const fusionInstance = ({
    timeoutInSeconds = 0,
  }: AxiosGeneratorProps = {}): AxiosInstance =>
    axios.create({
      baseURL,
      timeout: timeoutInSeconds * 1000,
    });

  const handleFusionLogin = async () => {
    fusionInstance()
      .get('/api/auth/login')
      .then((res) => console.log(res));
  };
  return user ? (
    <>
      <li className={classnames('auth-nav', className)}>
        <span className="link">
          Welcome, <span className="codename">{user.codename}</span>!
        </span>
      </li>
      <li className={classnames('auth-nav', className)}>
        <Link to="/account" onClick={closeMenu}>
          My Account
        </Link>
      </li>
      <li className={classnames('auth-nav', className)}>
        <Link to="/stories" onClick={closeMenu}>
          My Stories
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className={classnames('auth-nav', className)}>
        <Link to="/login" onClick={closeMenu}>
          Log In
        </Link>
      </li>
      <li className={classnames('auth-nav', className)}>
        <Link to="/signup" onClick={closeMenu}>
          Sign Up
        </Link>
      </li>
      <li className={classnames('auth-nav', className)}>
        <button onClick={handleFusionLogin}>Fusion Login</button>
      </li>
    </>
  );
}
