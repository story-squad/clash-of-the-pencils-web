import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  AuthModal,
  CookiePopup,
  ReadTokenData,
  SEO,
  TermsOfService,
} from './components/common';
import { Activation } from './components/pages/Activated';
import { GamePage } from './components/pages/GamePage';
import { VotingPage } from './components/pages/GamePage/VotingPage';
import { LandingPage } from './components/pages/LandingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { ResetPasswordPage } from './components/pages/ResetPasswordPage';
import { ResultsPage } from './components/pages/ResultsPage';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <SEO />
      <AuthModal />
      <ReadTokenData />
      <CookiePopup />
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/activated" component={Activation} />
        <Route path="/vote" component={VotingPage} />
        <Route path="/tos" component={TermsOfService} />
        <Route path="/game" component={GamePage} />
        <Route path="/results" component={ResultsPage} />
        <Route path="/reset" component={ResetPasswordPage} />
        <Route path="/profile" component={ProfilePage} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/game" />} />
      </Switch>
    </div>
  );
};

export default App;
