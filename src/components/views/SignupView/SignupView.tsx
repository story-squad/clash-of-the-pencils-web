import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignupForm } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';
import { useAuth0 } from '@auth0/auth0-react';

const defaultUserValues: {
  email: string;
  firstName: string;
  lastName: string;
} = {
  email: '',
  firstName: '',
  lastName: '',
};

export default function SignupView(): React.ReactElement {
  const methods = useForm({
    defaultValues: defaultUserValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  // const { push } = useHistory();
  // refactor to use loginWithRedirect from Auth0
  // const login = useSetRecoilState(auth.login);
  // needs to post user object to auth0 user database on submission
  // const submitHandler = useCallback(
  //   onSubmit ??
  //     (async (data: Users.INewUser) => {
  //       Reflect.deleteProperty(data, 'confirmPassword');
  //       const res = await (() => {
  //         if (isNew && cleverId && roleId)
  //           return Clever.signupWithClever(data, roleId, cleverId);
  //         return Auth.signup(data);
  //       })();
  //       login(res);
  //       push('/');
  //     }),
  //   [login, onSubmit],
  // );
  const { loginWithRedirect } = useAuth0();

  return (
    <DashboardTemplate useStorySquadHeader className="signup-view">
      <div className="signup-header">
        <h2>Sign Up Using Email Address</h2>
      </div>
      <FormProvider {...methods}>
        <SignupForm />
      </FormProvider>
      <p className="form-footer">
        Already have an account?{' '}
        <span onClick={() => loginWithRedirect()}>Sign In Here</span>
      </p>
    </DashboardTemplate>
  );
}
