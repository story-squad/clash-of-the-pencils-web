import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { Auth } from '../../../api';
import { auth } from '../../../state';
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
}: LoginViewProps): React.ReactElement {
  // Get form methods for the provider
  const methods = useForm();

  // Get login selector from Recoil
  const login = useSetRecoilState(auth.login);

  // Memoize the passed in submit handler if there was one, else use our custom function
  const submitHandler = useCallback(
    onSubmit ??
      (async (data: Auth.ILoginBody) => {
        const res = await Auth.login(data);
        login(res);
      }),
    [login],
  );

  return (
    <FormProvider {...methods}>
      <DashboardTemplate useStorySquadHeader className="login-view">
        <LoginForm onSubmit={submitHandler} />
        <p className="form-footer">
          Need to create an account?{' '}
          <span onClick={openSignup}>Sign Up Here</span>
        </p>
      </DashboardTemplate>
    </FormProvider>
  );
}
