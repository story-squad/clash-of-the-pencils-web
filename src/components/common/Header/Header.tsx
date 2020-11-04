import React, { useEffect, useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { token } from '../../../utils';
import { time } from '../../../utils';

interface HeaderProps {
  title?: string;
}
interface RouteData {
  route: string;
  text: string;
}

const dashRoute: RouteData = { route: '/dashboard', text: 'Dashboard' };
const submitRoute: RouteData = { route: '/submission', text: 'Submit a Story' };
const voteRoute: RouteData = { route: '/voting', text: 'Vote' };
const streamRoute: RouteData = { route: '/stream', text: 'Watch Stream' };
const winnerRoute: RouteData = { route: '/winners', text: 'View Winners' };

const Header = ({ title = 'Story Squad' }: HeaderProps): React.ReactElement => {
  const { push } = useHistory();
  const [timedRoute, setTimedRoute] = useState<null | RouteData>(null);

  useEffect(() => {
    switch (time.getCurrentEvent()) {
      case 'SUBMIT':
        setTimedRoute(submitRoute);
        return;
      case 'VOTE':
        setTimedRoute(voteRoute);
        return;
      case 'STREAM':
        setTimedRoute(streamRoute);
        return;
      case 'NONE':
        setTimedRoute(winnerRoute);
        return;
      default:
        setTimedRoute(null);
        return;
    }
  }, []);

  const logout = () => {
    token.clear();
    push('/');
  };

  return (
    <header>
      <h2>
        <Link to="/dashboard">{title}</Link>
      </h2>
      <nav>
        <RouteLink {...dashRoute} />
        {timedRoute && <RouteLink {...timedRoute} />}
        <span className="logout" onClick={logout}>
          Log Out
        </span>
      </nav>
    </header>
  );
};

const RouteLink: React.FC<RouteData> = (route) => {
  return (
    <NavLink activeClassName="current" to={route.route}>
      {route.text}
    </NavLink>
  );
};

export default Header;
