import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth0LoginButton from './components/auth0/Auth0Login';
import { ActivationModal } from './components/modals';
import { LoginEmailRedirect, PrivateRoute } from './components/providers';
import {
  AccountView,
  CleverRedirectView,
  DashboardView,
  ErrorView,
  ForgotCodenameView,
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
        <Route path="/forgot/codename" render={() => <ForgotCodenameView />} />
        <Route path="/account" render={() => <AccountView />} />
        <Route path="/reset/submit" render={() => <ResetPasswordView />} />
        <Route path="/oauth/clever" render={() => <CleverRedirectView />} />

        {/* Redirects */}
        <Route path="/auth/login" render={() => <LoginEmailRedirect />} />
        <Route
          path="/activate"
          render={(props) => <ActivationModal {...props} />}
        />
        {/* temporary route for testing purposes */}
        <Route path="/auth/auth0login" render={() => <Auth0LoginButton />} />

        {/* Private Routes */}
        <PrivateRoute path="/stories" component={() => <MyStoriesView />} />

        {/* Public Routes */}
        <Route path="/schedule" render={() => <ScheduleView />} />
        <Route path="/winners" render={WinnersView} />
        <Route path="/termsofservice" render={TermsView} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
