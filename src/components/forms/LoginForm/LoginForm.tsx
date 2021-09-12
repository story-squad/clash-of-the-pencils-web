import { useAsync } from '@story-squad/react-utils';
import React, { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth } from '../../../api';
import { Button, LoadIcon } from '../../atoms';
import { Input } from '../../molecules';
import { FormProps } from '../formTypes';
import './styles/index.scss';

export type LoginFormProps = FormProps<Auth.ILoginBody, Auth.IAuthResponse>;

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

  const [exec, isLoading, res] = useAsync({
    asyncFunction: handleSubmit(onSubmit),
    errorHandler,
  });

  useEffect(() => console.log({ res }), [res]);

  return (
    <form className="login-form" onSubmit={exec}>
      {errors?.form && (
        <div className="server-error">{errors.form.message}</div>
      )}
      <Input
        name="codename"
        label="Codename"
        rules={{ required: 'Please enter your codename!' }}
        placeholder="Enter your codename"
      />
      <Input
        name="password"
        label="Password"
        inputType="password"
        rules={{ required: 'Please enter a password!' }}
        placeholder="Enter your password"
      />
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
