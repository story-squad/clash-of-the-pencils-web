import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Splash } from './Splash';
import { Login } from './LoginForm';
import { Signup } from './SignupForm';

const LandingPage = (): React.ReactElement => {
  return (
    <div className="landing-page">
      <Switch>
        <Route
          exact
          path={['/', '/login']}
          component={() => (
            <>
              <Splash isLogin={true} />
              <Login />
            </>
          )}
        />
        <Route
          exact
          path={['/register', '/signup']}
          component={() => (
            <>
              <Splash isLogin={false} />
              <Signup />
            </>
          )}
        />
      </Switch>
    </div>
  );
};

export default LandingPage;
