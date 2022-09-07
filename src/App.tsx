import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ActivationModal } from './components/modals';
import { LoginEmailRedirect, PrivateRoute } from './components/providers';
import {
  AccountView,
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
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      console.table(user);
      // WIP Redirect user to signup page if metadata is not present
      getAccessTokenSilently().then((token) => {
        sessionStorage.setItem('token', token);
      });
    }
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
        <Route path="/signup" render={() => <SignupView />} />
        <Route
          path="/forgot/password"
          render={({ history }) => (
            <ForgotPasswordView openLogin={() => history.push('/login')} />
          )}
        />
        <Route path="/forgot/codename" render={() => <ForgotCodenameView />} />
        <Route path="/account" render={() => <AccountView />} />
        <Route path="/reset/submit" render={() => <ResetPasswordView />} />

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
        <Route path="/terms-of-service" render={TermsView} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
