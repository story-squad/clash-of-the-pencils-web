import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth, Users } from '../../../api';
import { Button, CleverButton, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import './styles/index.scss';

export type SignupFormProps = FormProps<Users.INewUser>;

export default function SignupForm({
  onSubmit,
  onError,
}: SignupFormProps): React.ReactElement {
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
    <form className="signup-form" onSubmit={exec}>
      <CleverButton htmlType="button" />
      <p className="alt-font">or</p>
      <p className="main-font">Sign In Using Email Address</p>
      {errors?.form && (
        <div className="server-error">{errors.form.message}</div>
      )}
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
