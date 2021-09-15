import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth } from '../../../api';
import { Button, CleverButton, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type LoginFormProps = FormProps<Auth.ILoginBody>;

export default function LoginForm({
  onSubmit,
  onError,
}: LoginFormProps): React.ReactElement {
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

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
        } else {
          clearErrors('form');
        }
      }),
    [onError],
  );

  const [exec, isLoading] = useAsync({
    asyncFunction: handleSubmit(onSubmit),
    errorHandler,
  });

  return (
    <form className="login-form" onSubmit={exec}>
      <CleverButton htmlType="button" />
      <p className="alt-font">or</p>
      <p className="main-font">Sign In Using Email Address</p>
      {errors?.form && (
        <div className="server-error">{errors.form.message}</div>
      )}
      {authFormInputs.codename({
        minLength: { value: 2, message: 'Too short' },
      })}
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
