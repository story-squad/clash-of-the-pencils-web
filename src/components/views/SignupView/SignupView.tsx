import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { Auth, Users } from '../../../api';
import { auth } from '../../../state';
import { SignupForm } from '../../forms';
import { DashboardTemplate } from '../../templates';

export interface SignupViewProps {
  onSubmit?: (data: Users.INewUser) => void;
  openLogin?: () => void;
}

export default function SignupView({
  onSubmit,
  openLogin,
}: SignupViewProps): React.ReactElement {
  const methods = useForm();

  const login = useSetRecoilState(auth.login);

  const submitHandler = useCallback(
    onSubmit ??
      (async (data: Users.INewUser) => {
        const res = await Auth.signup(data);
        login(res);
      }),
    [login, onSubmit],
  );

  return (
    <FormProvider {...methods}>
      <DashboardTemplate useStorySquadHeader className="signup-view">
        <SignupForm onSubmit={submitHandler} />
      </DashboardTemplate>
    </FormProvider>
  );
}
