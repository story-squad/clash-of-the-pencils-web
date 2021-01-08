import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  AuthModal,
  ReadTokenData,
  SEO,
  TermsOfService,
} from './components/common';
import { Activation } from './components/pages/Activated';
import { GamePage } from './components/pages/GamePage';
import { VotingPage } from './components/pages/GamePage/VotingPage';
import { Scroller } from './components/pages/LandingPage';
import { Profile } from './components/pages/Profile';
import { ResetPasswordPage } from './components/pages/ResetPassword';
import { ResultsPage } from './components/pages/ResultsPage';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <SEO />
      <AuthModal />
      <ReadTokenData />
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={Scroller} />
        <Route path="/activated" component={Activation} />
        <Route path="/vote" component={VotingPage} />
        <Route path="/tos" component={TermsOfService} />
        <Route path="/game" component={GamePage} />
        <Route path="/results" component={ResultsPage} />
        <Route path="/reset" component={ResetPasswordPage} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/game" />} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
};

export default App;
