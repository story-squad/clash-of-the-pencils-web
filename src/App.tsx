import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils';

// Route Components
import { LandingPageContainer } from './components/pages/LandingPage';
import { Dashboard } from './components/pages/Dashboard';
import { Activation } from './components/pages/Activated';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        {/* Public Routes */}
        <Route
          exact
          path={['/', '/login', '/register', '/signup']}
          component={() => <LandingPageContainer />}
        />
        <Route path="/activated/:token" component={Activation} />

        {/* Private Routes */}
        <PrivateRoute path="/dashboard" component={Dashboard} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/dashboard" />} />
      </Switch>
    </div>
  );
};

export default App;
