import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth, Users } from '../../../api';
import { auth } from '../../../state';
import { SignupForm } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface SignupViewProps {
  onSubmit?: (data: Users.INewUser) => void;
  openLogin?: () => void;
}

export default function SignupView({
  onSubmit,
  openLogin,
}: SignupViewProps): React.ReactElement {
  const methods = useForm();
  const { push } = useHistory();

  const login = useSetRecoilState(auth.login);

  const submitHandler = useCallback(
    onSubmit ??
      (async (data: Users.INewUser) => {
        Reflect.deleteProperty(data, 'confirmPassword');
        const res = await Auth.signup(data);
        login(res);
        push('/');
      }),
    [login, onSubmit],
  );

  return (
    <DashboardTemplate useStorySquadHeader className="signup-view">
      <FormProvider {...methods}>
        <SignupForm onSubmit={submitHandler} />
      </FormProvider>
      <p className="form-footer">
        Already have an account? <span onClick={openLogin}>Sign In Here</span>
      </p>
    </DashboardTemplate>
  );
}
