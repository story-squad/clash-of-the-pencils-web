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
    const params = location.search;
    const index = params.indexOf('=') + 1;
    const newPath = params.slice(index);
    push('/' + newPath);
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

export default App;
