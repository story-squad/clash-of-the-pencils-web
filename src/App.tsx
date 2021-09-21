import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  DashboardView,
  LoginView,
  ScheduleView,
  SignupView,
} from './components/views';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      {/* <SEO /> */}
      {/* <CookiePopup /> */}
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={DashboardView} />
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
        <Route
          path="/schedule"
          render={({ history }) => (
            <ScheduleView openDashboard={() => history.push('/')} />
          )}
        />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
