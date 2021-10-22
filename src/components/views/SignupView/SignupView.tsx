import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth, Clever, Users } from '../../../api';
import { auth } from '../../../state';
import { CleverButton } from '../../atoms';
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
  cleverId,
  email,
  firstname,
  isNew = false,
  lastname,
  roleId,
}: SignupViewProps & Clever.NewRedirectState): React.ReactElement {
  const methods = useForm({
    defaultValues: { firstname, lastname, email },
  });
  const { push } = useHistory();

  const login = useSetRecoilState(auth.login);

  const submitHandler = useCallback(
    onSubmit ??
      (async (data: Users.INewUser) => {
        Reflect.deleteProperty(data, 'confirmPassword');
        const res = await (() => {
          if (isNew && cleverId && roleId)
            return Clever.signupWithClever(data, roleId, cleverId);
          return Auth.signup(data);
        })();
        login(res);
        push('/');
      }),
    [login, onSubmit],
  );

  return (
    <DashboardTemplate useStorySquadHeader className="signup-view">
      <div className="signup-header">
        {isNew ? (
          <>
            <h2>Hey, {firstname ? firstname : ''}!</h2>
            <p>
              <em>You&apos;ve been logged in to Clever!</em>
            </p>
            <p>
              Fill out the following information to create your brand new Story
              Squad account and we&apos;ll take care of the rest!
            </p>
          </>
        ) : (
          <>
            <CleverButton htmlType="button" signUp />
            <p className="alt-font">or</p>
            <p>Sign Up Using Email Address</p>
          </>
        )}
      </div>
      <FormProvider {...methods}>
        <SignupForm onSubmit={submitHandler} />
      </FormProvider>
      <p className="form-footer">
        Already have an account? <span onClick={openLogin}>Sign In Here</span>
      </p>
    </DashboardTemplate>
  );
}
