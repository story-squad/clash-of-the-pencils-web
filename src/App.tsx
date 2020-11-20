import React, { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { ComingSoon, PrivateRoute, Signout } from './components/common';

// Route Components
import { LandingPage } from './components/pages/LandingPage';
import { Activation } from './components/pages/Activated';
import { VotingPage } from './components/pages/VotingPage';
import { Dashboard } from './components/pages/Dashboard';
import { ResultsPage } from './components/pages/ResultsPage';

const App: React.FC = () => {
  const { push } = useHistory();
  const location = useLocation();
  useEffect(() => {
    const query = location.search.slice(1);
    const res = queryParser(query);
    if (res && res.path) {
      const newPath = `/${res.path ? res.path : ''}${
        res.token ? '/' + res.token : ''
      }`;
      console.log(newPath, res);
      setTimeout(() => {
        push(newPath);
      }, 10000);
    }
  }, []);
  return (
    <div className="App">
      <Switch>
        {/* Public Routes */}
        <Route
          exact
          path={['/', '/login', '/register', '/signup', '/info']}
          component={() => <LandingPage />}
        />
        <Route path="/activated/:token" component={Activation} />
        <Route path={['/logout', '/signout']} component={Signout} />
        <Route path="/vote" component={VotingPage} />

        {/* Private Routes */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/results" component={ResultsPage} />

        <PrivateRoute path="/comingsoon" component={() => <ComingSoon />} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
      </Switch>
    </div>
  );
};

const queryParser = (query: string) => {
  if (query === '') return;
  const params = query.split('&');
  const res: QueryParserResponse = {};
  for (const param of params) {
    const [key, value] = param.split('=');
    res[key] = value;
  }
  return res;
};

interface QueryParserResponse {
  [key: string]: string;
}

export default App;
