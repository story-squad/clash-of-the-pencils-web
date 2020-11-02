import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils';

// Route Components
import { LandingPage } from './components/pages/LandingPage';
import { Activation } from './components/pages/Activated';
import { Dashboard } from './components/pages/Dashboard';
import { SubmissionPage } from './components/pages/SubmissionPage';

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
        <Route path="/activated/:token" component={Activation} />

        {/* Private Routes */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/submission" component={SubmissionPage} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
      </Switch>
    </div>
  );
};

export default App;
