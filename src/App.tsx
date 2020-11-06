import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

// Route Components
import { LandingPage } from './components/pages/LandingPage';
import { Activation } from './components/pages/Activated';
import { Dashboard } from './components/pages/Dashboard';
import { SubmissionPage } from './components/pages/SubmissionPage';
import { VotingPage } from './components/pages/VotingPage';
import { WinnersPage } from './components/pages/WinnersPage';
import { StreamPage } from './components/pages/StreamPage';
import { PrivateRoute } from './components/common';

const App: React.FC = () => {
  //this side effect should run on every page change. It will stream user data to our google analytics account to be used for later optimization
  //initialize the Google Analytics data stream as soon as the App mounts
  useEffect(() => {
    ReactGA.initialize('UA-182257985-3');
    //Report Page View
    ReactGA.pageview(window.location.pathname + window.location.search);
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

        {/* Private Routes */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/submission" component={SubmissionPage} />
        <PrivateRoute path="/voting" component={VotingPage} />
        <PrivateRoute path="/winners" component={WinnersPage} />
        <PrivateRoute path="/stream" component={StreamPage} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
      </Switch>
    </div>
  );
};

export default App;
