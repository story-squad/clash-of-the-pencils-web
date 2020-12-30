import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  AuthModal,
  ReadTokenData,
  Signout,
  TermsOfService,
} from './components/common';
import { Activation } from './components/pages/Activated';
import { Scroller } from './components/pages/LandingPage';
const VotingPage = React.lazy(() =>
  import('./components/pages/GamePage/VotingPage').then(({ VotingPage }) => ({
    default: VotingPage,
  })),
);
const ResultsPage = React.lazy(() =>
  import('./components/pages/ResultsPage').then(({ ResultsPage }) => ({
    default: ResultsPage,
  })),
);
const GamePage = React.lazy(() =>
  import('./components/pages/GamePage').then(({ GamePage }) => ({
    default: GamePage,
  })),
);
const ResetPasswordPage = React.lazy(() =>
  import('./components/pages/ResetPassword').then(({ ResetPasswordPage }) => ({
    default: ResetPasswordPage,
  })),
);

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthModal />
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
          <Route path="/reset" component={ResetPasswordPage} />

          {/* Fallback Redirect to Dashboard */}
          <Route path="/" component={() => <Redirect to="/game" />} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
