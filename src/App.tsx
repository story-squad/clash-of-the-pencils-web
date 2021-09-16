import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginView from './components/views/LoginView/LoginView';
import SignupView from './components/views/SignupView/SignupView';
import SubmissionView from './components/views/Submission/SubmissionView';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      {/* <SEO /> */}
      {/* <CookiePopup /> */}
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={SubmissionView} />
        <Route
          path="/login"
          render={({ history }) => (
            <LoginView openSignup={() => history.push('/signup')} />
          )}
        />
        <Route
          path="/signup"
          render={({ history }) => (
            <SignupView openLogin={() => history.push('/login')} />
          )}
        />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
