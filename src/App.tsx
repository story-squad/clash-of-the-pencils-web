import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ActivationModal } from './components/modals';
import { LoginEmailRedirect, PrivateRoute } from './components/providers';
import {
  AccountView,
  CleverRedirectView,
  DashboardView,
  ErrorView,
  ForgotCodenameView,
  ForgotPasswordView,
  MyStoriesView,
  ResetPasswordView,
  ScheduleView,
  SignupView,
  TermsView,
  WinnersView,
} from './components/views';
import { useAuth0 } from '@auth0/auth0-react';

const App = (): React.ReactElement => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (isAuthenticated)
      getAccessTokenSilently().then((token) => {
        sessionStorage.setItem('token', token);
      });
  }, [isAuthenticated]);
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
