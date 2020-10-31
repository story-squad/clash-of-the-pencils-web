import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { clearToken } from '../../../utils';

interface HeaderProps {
  title?: string;
}

const Header = ({ title = 'Story Squad' }: HeaderProps): React.ReactElement => {
  const { push } = useHistory();

  const logout = () => {
    clearToken();
    push('/');
  };

  return (
    <header>
      <h2>
        <Link to="/dashboard">{title}</Link>
      </h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard">Submit a Story</Link>
        <Link to="/dashboard">Vote</Link>
        <Link to="/dashboard">View Top 3</Link>
        <Link to="/dashboard">View Winners</Link>
        <span className="logout" onClick={logout}>
          Log Out
        </span>
      </nav>
    </header>
  );
};

export default Header;
