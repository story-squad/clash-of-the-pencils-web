import { useAsync } from '@story-squad/react-utils';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  const clearFormError = () => clearErrors('form');

  const onSubmit: SubmitHandler<Auth.ILoginBody> = async (data) => {
    try {
      const res = await Auth.login(data);
      onSuccess(res);
    } catch (err) {
      let message: string;
      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else {
        message = 'An unknown error occurred. Please try again.';
      }
      setError('form', { type: 'manual', message });
    }
  };

  const [exec, isLoading] = useAsync({
    asyncFunction: handleSubmit(onSubmit),
  });

  return (
    <form onSubmit={exec}>
      {errors.form && <div className="server-error">{errors.form.message}</div>}
      <Input
        label="Codename"
        // rules={{ required: 'Please enter your codename!' }}
        placeholder="Enter your codename"
      />
      <Input
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
