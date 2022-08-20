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
import { useAuth0 } from '@auth0/auth0-react';

export interface SignupViewProps {
  onSubmit?: (data: Users.INewUser) => void;
  openLogin?: () => void;
}

export default function SignupView({
  onSubmit,
  cleverId,
  email,
  firstname,
  isNew = false,
  lastname,
  roleId,
}: SignupViewProps & Clever.NewRedirectState): React.ReactElement {
  const methods = useForm({
    defaultValues: { firstname, lastname, email },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const { push } = useHistory();
  // refactor to use loginWithRedirect from Auth0
  const login = useSetRecoilState(auth.login);
  // needs to post user object to auth0 user database on submission
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
  const { loginWithRedirect } = useAuth0();

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
        <SignupForm onSubmit={submitHandler} hideToS={isNew} />
      </FormProvider>
      <p className="form-footer">
        Already have an account?{' '}
        <span onClick={() => loginWithRedirect()}>Sign In Here</span>
      </p>
    </DashboardTemplate>
  );
}
