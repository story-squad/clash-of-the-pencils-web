import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ComingSoon, PrivateRoute, Signout } from './components/common';

// Route Components
import { LandingPage } from './components/pages/LandingPage';
import { Activation } from './components/pages/Activated';
import { Dashboard } from './components/pages/Dashboard';
import { VotingPage } from './components/pages/VotingPage';

const App: React.FC = () => {
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

        {/* Private Routes */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* TODO - CHANGE BACK TO A PRIVATE ROUTE */}
        <Route path="/vote" component={VotingPage} />

        <PrivateRoute path="/comingsoon" component={() => <ComingSoon />} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
      </Switch>
    </div>
  );
};

export default App;
