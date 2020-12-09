import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Signout, TermsOfService } from './components/common';
import { Activation } from './components/pages/Activated';
import { GamePage } from './components/pages/GamePage';
import { VotingPage } from './components/pages/GamePage/VotingPage';
import { LandingPage } from './components/pages/LandingPage';
import { ResultsPage } from './components/pages/ResultsPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        {/* Public Routes */}
        <Route
          exact
          path={['/', '/login', '/register', '/signup']}
          component={() => <LandingPage />}
        />
        <Route path="/activated" component={Activation} />
        <Route path={['/logout', '/signout']} component={Signout} />
        <Route path="/vote" component={VotingPage} />
        <Route path="/tos" component={TermsOfService} />
        <Route path="/game" component={GamePage} />
        <Route path="/results" component={ResultsPage} />

        {/* Private Routes */}

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/game" />} />
      </Switch>
    </div>
  );
};

export default App;
