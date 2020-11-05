import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './Home';
import { Info } from './Info';
import { Login } from './LoginForm';
import { Signup } from './SignupForm';
import { LandingHeader } from './LandingHeader';

const LandingPage = (): React.ReactElement => {
  return (
    <div className="landing-page">
      <LandingHeader />
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/info" component={() => <Info />} />
        <Route exact path="/login" component={() => <Login />} />
        <Route
          exact
          path={['/register', '/signup']}
          component={() => <Signup />}
        />
      </Switch>
    </div>
  );
};

export default LandingPage;
