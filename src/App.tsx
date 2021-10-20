import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ActivationModal } from './components/modals';
import {
  DashboardView,
  ErrorView,
  LoginView,
  ScheduleView,
  SignupView,
  TermsView,
  WinnersView,
} from './components/views';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      {/* <SEO /> */}
      {/* <CookiePopup /> */}
      <Switch>
        {/* Dashboard Route */}
        <Route exact path="/" component={DashboardView} />

        {/* Error Handler Route */}
        <Route path="/error" component={ErrorView} />

        {/* Public Routes */}
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
        <Route
          path="/activate"
          render={(props) => <ActivationModal {...props} />}
        />
        <Route path="/winners" render={WinnersView} />
        <Route path="/termsofservice" render={TermsView} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
