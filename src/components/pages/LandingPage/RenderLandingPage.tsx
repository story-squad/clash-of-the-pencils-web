import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from '../../common';
import { Home } from './Home';
import { Login } from './LoginForm';
import { Signup } from './SignupForm';

const LandingPage = (): React.ReactElement => {
  return (
    <div className="landing-page">
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Home />} />
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
