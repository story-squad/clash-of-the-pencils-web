import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { Auth, Clever } from '../../../api';
import { useOpenDashboard } from '../../../hooks';
import { auth } from '../../../state';
import { LoginForm } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface LoginViewProps {
  onSubmit?: (data: Auth.ILoginBody) => void;
  openSignup?: () => void;
  openForgotPassword?: () => void;
  openForgotCodename?: () => void;
}

export default function LoginView({
  onSubmit,
  // Clever Auth Params
  isMerge = false,
  cleverId,
  codename,
  // Route Handling
  openSignup,
  openForgotCodename,
  openForgotPassword,
}: LoginViewProps & Clever.MergeRedirectState): React.ReactElement {
  // Get form methods for the provider
  const methods = useForm({ defaultValues: { codename } });

  // Get login selector from Recoil
  const login = useSetRecoilState(auth.login);

  const openDash = useOpenDashboard();

  // Memoize the passed in submit handler if there was one, else use our custom function
  const submitHandler = useCallback(
    onSubmit ??
      (async (data: Auth.ILoginBody) => {
        const res = await (() => {
          if (isMerge && cleverId) return Clever.mergeAccounts(data, cleverId);
          else return Auth.login(data);
        })();
        login(res);
        openDash();
      }),
    [login, onSubmit, isMerge, cleverId],
  );

  return (
    <DashboardTemplate useStorySquadHeader className="login-view">
      <div className="login-header">
        {/* Google Login Button */}
        <div
          id="g_id_onload"
          data-client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          data-context="signin"
          data-ux_mode="redirect"
          data-login_uri="http://localhost:8000/api/auth/google-redirect"
          data-auto_select="true"
        ></div>

        <div
          className="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
        {/* TODO Clever button future reimplementation */}
        {/* {isMerge ? (
          <>
            {codename && <h2>Hey, {codename}!</h2>}
            <p>
              <em>It looks like you already have a Story Squad account!</em>
            </p>
            <p>
              Enter your password below to automatically link your Clever and
              Story Squad accounts.
            </p>
          </>
        ) : (
          <>
            <CleverButton htmlType="button" />
            <p className="alt-font">or</p>
            <p>Sign In Using Story Squad Account</p>
          </>
        )} */}
      </div>
      <FormProvider {...methods}>
        <LoginForm onSubmit={submitHandler} />
      </FormProvider>
      <p className="form-footer">
        Need to create an account?{' '}
        <span className="all-caps" onClick={openSignup}>
          Sign&nbsp;Up&nbsp;Here
        </span>
      </p>
      <p className="form-footer forgot">
        <span onClick={openForgotCodename}>Forgot Codename?</span>
      </p>
      <p className="form-footer forgot">
        <span onClick={openForgotPassword}>Forgot Password?</span>
      </p>
    </DashboardTemplate>
  );
}
