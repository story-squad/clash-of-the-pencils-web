import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { ActivationModal } from './components/modals';
import { LoginEmailRedirect, PrivateRoute } from './components/providers';
import {
  AccountView,
  DashboardView,
  ErrorView,
  ForgotCodenameView,
  ForgotPasswordView,
  MyStoriesView,
  ScheduleView,
  SignupView,
  TermsView,
  WinnersView,
} from './components/views';

const history = useHistory();

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
        <Route path="/signup" component={() => <SignupView />} />
        <Route
          path="/forgot/password"
          component={() => (
            <ForgotPasswordView openLogin={() => history.push('/login')} />
          )}
        />
        <Route
          path="/forgot/codename"
          component={() => <ForgotCodenameView onSubmit={undefined} />}
        />
        <Route path="/account" component={() => <AccountView />} />

        {/* Redirects */}
        <Route path="/auth/login" component={() => <LoginEmailRedirect />} />
        <Route
          path="/activate"
          component={(props: any) => <ActivationModal {...props} />}
        />

        {/* Private Routes */}
        <PrivateRoute path="/stories" component={() => <MyStoriesView />} />

        {/* Public Routes */}
        <Route path="/schedule" component={() => <ScheduleView />} />
        <Route path="/winners" component={() => <WinnersView />} />
        <Route path="/terms-of-service" component={() => <TermsView />} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
