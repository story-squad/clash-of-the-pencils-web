import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Splash from './LandingSplash';

const LandingPage = (props) => {
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

const LoginForm = (props) => {
  return (
    <form>
      <legend>Log In!</legend>
      <label>
        <input placeholder="Email" />
      </label>
      <label>
        <input placeholder="Password" type="password" />
      </label>
      <input type="submit" value="Submit" />
      <div>
        Don't have an account?<br />
        <Link to='/register'>Sign Up Here!</Link>
      </div>
      <button>Just Voting</button>
    </form>
  );
};

const SignupForm = (props) => {
  return (
    <form>
      <fieldset>
        <legend>Sign Up!</legend>
      </fieldset>
    </form>
  );
};

export default LandingPage;
