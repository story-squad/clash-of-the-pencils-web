import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  ComingSoon,
  PrivateRoute,
  Signout,
  TermsOfService,
} from './components/common';
import { Activation } from './components/pages/Activated';
import { Dashboard } from './components/pages/Dashboard';
// Route Components
import { LandingPage } from './components/pages/LandingPage';
import { ResultsPage } from './components/pages/ResultsPage';
import { VotingPage } from './components/pages/VotingPage';

const App: React.FC = () => {
  console.log('pushing branch to drew');
  return (
    <div className="App">
      <Switch>
        {/* Public Routes */}
        <Route
          exact
          path={['/', '/login', '/register', '/signup', '/info']}
          component={() => <LandingPage />}
        />
        <Route path="/activated" component={Activation} />
        <Route path={['/logout', '/signout']} component={Signout} />
        <Route path="/vote" component={VotingPage} />
        <Route path="/tos" component={TermsOfService} />

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
// const queryParser = (query: string) => {
//   if (query === '') return;
//   const params = query.split('&');
//   const res: QueryParserResponse = {};
//   for (const param of params) {
//     const [key, value] = param.split('=');
//     res[key] = value;
//   }
//   return res;
// };

// interface QueryParserResponse {
//   [key: string]: string;
// }

export default App;
