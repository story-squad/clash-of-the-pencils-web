import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CookiePopup } from './components/common/CookiePopup';
import { SEO } from './components/common/SEO';
import LoginView from './components/views/LoginView/LoginView';
import SignupView from './components/views/SignupView/SignupView';
import SubmissionView from './components/views/Submission/SubmissionView';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <SEO />
      <CookiePopup />
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={SubmissionView} />
        <Route path="/login" component={LoginView} />
        <Route path="/signup" component={SignupView} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
