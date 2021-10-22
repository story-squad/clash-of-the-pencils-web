import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth, Clever } from '../../../api';
import { auth } from '../../../state';
import { CleverButton } from '../../atoms';
import { LoginForm } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface LoginViewProps {
  onSubmit?: (data: Auth.ILoginBody) => void;
  openSignup?: () => void;
}

export default function LoginView({
  onSubmit,
  openSignup,
  isMerge = false,
  cleverId,
  codename,
}: LoginViewProps & Clever.MergeRedirectState): React.ReactElement {
  // Get form methods for the provider
  const methods = useForm();
  const { push } = useHistory();

  // Get login selector from Recoil
  const login = useSetRecoilState(auth.login);

  // Memoize the passed in submit handler if there was one, else use our custom function
  const submitHandler = useCallback(
    onSubmit ??
      (async (data: Auth.ILoginBody) => {
        const res = await (() => {
          if (isMerge && cleverId) return Clever.mergeAccounts(data, cleverId);
          else return Auth.login(data);
        })();
        login(res);
        push('/');
      }),
    [login, onSubmit, isMerge, cleverId],
  );

  return (
    <FormProvider {...methods}>
      <DashboardTemplate useStorySquadHeader className="login-view">
        <div className="login-header">
          {isMerge ? (
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
              <p className="main-font">Sign In Using Story Squad Account</p>
            </>
          )}
        </div>
        <LoginForm onSubmit={submitHandler} defaultValues={{ codename }} />
        <p className="form-footer">
          Need to create an account?{' '}
          <span onClick={openSignup}>Sign Up Here</span>
        </p>
      </DashboardTemplate>
    </FormProvider>
  );
}
