import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Splash from './LandingSplash';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const LandingPage = (): React.ReactElement => {
  return (
    <div className="landing-page">
      <Switch>
        <Route
          exact
          path={['/', '/login']}
          component={() => (
            <>
              <Splash component={() => <h1>Welcome to Story Squad!</h1>} />
              <LoginForm />
            </>
          )}
        />
        <Route
          exact
          path={['/register', '/signup']}
          component={() => (
            <>
              <Splash component={() => <h1>Welcome to Story Squad!</h1>} />
              <SignupForm />
            </>
          )}
        />
      </Switch>
    </div>
  );
};

export default LandingPage;
