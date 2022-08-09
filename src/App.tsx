import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
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
import { auth0Config } from './config';

const App = (): React.ReactElement => {
  /**
   * @title getAccessToken
   * @description Calls the Auth0 getAccessTokenSilently method to retrieve the access token from Auth0 to attach to the request header (Authorization: Bearer + AccessToken) for use with protected API routes
   * @param auth0Config - Auth0 config object: { audience, domain }
   * @returns A promise that resolves to the access token
   */

  async function getAccessToken(): Promise<string | void> {
    try {
      const accessToken = await useAuth0().getAccessTokenSilently(auth0Config);
      return accessToken;
    } catch (e) {
      if (e instanceof Error) {
        if (
          e.message === 'login_required' ||
          e.message === 'consent_required'
        ) {
          useAuth0().loginWithRedirect();
        }
      } else {
        if (e instanceof Error) {
          console.log('Error getting access token');
          throw e;
        }
      }
    }
  }

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
