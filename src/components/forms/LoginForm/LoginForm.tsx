import { ErrorMessage } from '@hookform/error-message';
import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth } from '../../../api';
import { dataConstraints } from '../../../config';
import { Button, CleverButton, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type LoginFormProps = FormProps<Auth.ILoginBody>;

export default function LoginForm({
  onSubmit,
  onError,
}: LoginFormProps): React.ReactElement {
  const { handleSubmit, setError, clearErrors } = useFormContext();

  const clearFormError = () => clearErrors('form');

  const errorHandler = useCallback(
    onError ?? // If a custom error handler was provided, use it instead of our function
      ((error: unknown) => {
        if (error) {
          let message: string;
          if (Auth.isAxiosError(error) && error.response?.data?.message) {
            message = error.response.data.message;
          } else {
            message = 'An unknown error occurred. Please try again.';
          }
          setError('form', { type: 'manual', message });
        }
      }),
    [onError],
  );

  const submitHandler: LoginFormProps['onSubmit'] = (data) => {
    if (data.codename && dataConstraints.emailPattern.test(data.codename)) {
      onSubmit({ email: data.codename, password: data.password });
    } else {
      onSubmit(data);
    }
  };

  const [exec, isLoading] = useAsync({
    asyncFunction: handleSubmit(submitHandler),
    onError: errorHandler,
  });

  return (
    <form className="login-form" onSubmit={exec}>
      <CleverButton htmlType="button" />
      <p className="alt-font">or</p>
      <p className="main-font">Sign In Using Story Squad Account</p>
      <ErrorMessage
        name="form"
        render={({ message }) => <div className="server-error">{message}</div>}
      />
      {authFormInputs.codename(
        {
          rules: {
            minLength: { value: 2, message: 'Too short' },
          },
        },
        true,
      )}
      {authFormInputs.password()}
      <Button
        disabled={isLoading}
        iconRight={isLoading && <LoadIcon />}
        onClick={clearFormError}
      >
        Sign In
      </Button>
    </form>
  );
}
