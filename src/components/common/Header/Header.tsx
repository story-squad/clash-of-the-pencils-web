import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { clearToken } from '../../../utils';

interface HeaderProps {
  title?: string;
}

const routes = [
  { route: '/dashboard', text: 'Dashboard' },
  { route: '/submission', text: 'Submit a Story' },
  { route: '/voting', text: 'Vote' },
  { route: '/winners', text: 'View Winners' },
  { route: '/stream', text: 'Watch Stream' },
];

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
        {routes.map((r, i) => (
          <NavLink to={r.route} activeClassName="current" key={i}>
            {r.text}
          </NavLink>
        ))}
        <span className="logout" onClick={logout}>
          Log Out
        </span>
      </nav>
    </header>
  );
};

export default Header;
