import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ReadTokenData, Signout, TermsOfService } from './components/common';
import { Activation } from './components/pages/Activated';
import { GamePage } from './components/pages/GamePage';
import { VotingPage } from './components/pages/GamePage/VotingPage';
import { ResetEmailForm } from './components/pages/ResetPassword/ResetEmailForm';
import { PasswordResetForm } from './components/pages/ResetPassword/ResetPasswordForm';
import { ResultsPage } from './components/pages/ResultsPage';
import { Scroller } from './components/pages/ScrollingLandingPage';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <ReadTokenData />
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={Scroller} />
        <Route path="/activated" component={Activation} />
        <Route path={['/logout', '/signout']} component={Signout} />
        <Route path="/vote" component={VotingPage} />
        <Route path="/tos" component={TermsOfService} />
        <Route path="/game" component={GamePage} />
        <Route path="/results" component={ResultsPage} />

        <Route path="/reset" component={ResetEmailForm} />
        <Route path="/passwordreset" component={PasswordResetForm} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/game" />} />
      </Switch>
    </div>
  );
};

export default App;
