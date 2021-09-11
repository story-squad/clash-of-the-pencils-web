import { useAsync } from '@story-squad/react-utils';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth } from '../../../api';
import { Button, LoadIcon } from '../../atoms';
import { Input } from '../../molecules';
import { FormOnSuccess } from '../formTypes';

// This lets us move the success handling to the outside of the form
export interface LoginFormProps {
  onSuccess: FormOnSuccess<Auth.IAuthResponse>;
}

export default function LoginForm({
  onSuccess,
}: LoginFormProps): React.ReactElement {
  const { handleSubmit, errors, setError, clearErrors } = useFormContext();

  const clearFormError = () => clearErrors('form');

  const [exec, isLoading, , error] = useAsync({
    asyncFunction: handleSubmit(Auth.login),
    setter: onSuccess,
  });

  useEffect(() => {
    let message: string;
    if (Auth.isAxiosError(error) && error.response?.data?.message) {
      message = error.response.data.message;
    } else {
      message = 'An unknown error occurred. Please try again.';
    }
    setError('form', { type: 'manual', message });
  }, [error]);

  return (
    <form onSubmit={exec}>
      {errors?.form && (
        <div className="server-error">{errors.form.message}</div>
      )}
      <Input
        name="codename"
        label="Codename"
        // rules={{ required: 'Please enter your codename!' }}
        placeholder="Enter your codename"
      />
      <Input
        name="password"
        label="Password"
        inputType="password"
        // rules={{ required: 'Please enter a password!' }}
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
