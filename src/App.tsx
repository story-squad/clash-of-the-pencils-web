import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* <SEO /> */}
      {/* <CookiePopup /> */}
      <Routes>
        {/* Dashboard Route */}
        <Route path="/" element={<DashboardView />} />

        {/* Error Handler Route */}
        <Route path="/error" element={<ErrorView />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <LoginView
              openSignup={() => navigate('/signup')}
              openForgotCodename={() => navigate('/forgot/codename')}
              openForgotPassword={() => navigate('/forgot/password')}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignupView openLogin={() => navigate('/login')} />}
        />
        <Route
          path="/forgot/password"
          element={<ForgotPasswordView openLogin={() => navigate('/login')} />}
        />
        <Route path="/forgot/codename" element={<ForgotCodenameView />} />
        <Route path="/account" element={<AccountView />} />
        <Route path="/reset/submit" element={<ResetPasswordView />} />
        <Route path="/oauth/clever" element={<CleverRedirectView />} />

        {/* Redirects */}
        <Route path="/auth/login" element={<LoginEmailRedirect />} />
        <Route path="/activate" element={<ActivationModal />} />

        {/* Private Routes */}
        <Route
          path="/stories"
          element={<PrivateRoute outlet={<MyStoriesView />} />}
        />
        {/* <PrivateRoute path="/stories" component={() => <MyStoriesView />} /> */}

        {/* Public Routes */}
        <Route path="/schedule" element={<ScheduleView />} />
        <Route path="/winners" element={<WinnersView />} />
        <Route path="/termsofservice" element={<TermsView />} />

        {/* Fallback Redirect to Dashboard */}
        <Route path="*" element={<DashboardView />} />
      </Routes>
    </div>
  );
};

export default App;
