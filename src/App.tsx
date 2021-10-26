import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ActivationModal } from './components/modals';
import { PrivateRoute } from './components/providers';
import {
  CleverRedirectView,
  DashboardView,
  ErrorView,
  ForgotPasswordView,
  LoginView,
  MyStoriesView,
  ResetPasswordView,
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

        {/* Auth Routes */}
        <Route
          path="/login"
          render={({ history }) => (
            <LoginView
              openSignup={() => history.push('/signup')}
              openForgotCodename={() => history.push('/forgot/codename')}
              openForgotPassword={() => history.push('/forgot/password')}
            />
          )}
        />
        <Route
          path="/signup"
          render={({ history }) => (
            <SignupView openLogin={() => history.push('/login')} />
          )}
        />
        <Route
          path="/forgot/password"
          render={({ history }) => (
            <ForgotPasswordView openLogin={() => history.push('/login')} />
          )}
        />
        <Route path="/reset/submit" render={() => <ResetPasswordView />} />
        <Route path="/oauth/clever" render={() => <CleverRedirectView />} />

        {/* Private Routes */}
        <PrivateRoute path="/stories" component={() => <MyStoriesView />} />

        {/* Public Routes */}
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
