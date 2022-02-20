import { ErrorMessage } from '@hookform/error-message';
import { useAsync } from '@story-squad/react-utils';
import React, { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { Auth } from '../../../api';
import { dataConstraints } from '../../../config';
import { useConfirmationModal } from '../../../hooks';
import { auth } from '../../../state';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type LoginFormProps = FormProps<Auth.ILoginBody>;

export default function LoginForm({
  onSubmit,
  onError,
}: LoginFormProps): React.ReactElement {
  const { handleSubmit, setError, clearErrors } = useFormContext();
  const [userIsDeleted, setUserIsDeleted] = useRecoilState(auth.userIsDeleted);
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
          const formError = { type: 'manual', message };
          switch (message) {
            case 'User not found':
              setError('codename', formError);
              break;
            case 'Incorrect password':
              setError('password', formError);
              break;
            default:
              setError('form', formError);
          }
        }
      }),
    [onError],
  );

  const submitHandler: LoginFormProps['onSubmit'] = async (data) => {
    if (data.codename && dataConstraints.emailPattern.test(data.codename)) {
      await onSubmit({ email: data.codename, password: data.password });
    } else {
      await onSubmit(data);
    }
  };

  useEffect(() => {
    if (userIsDeleted) {
      successDelete();
      setUserIsDeleted(false);
    } else {
      return;
    }
  }, [userIsDeleted]);

  const [onDelete, successDelete] = useConfirmationModal({
    title: 'Account Deleted Successfully!',
    confirmText: 'Ok',
    hideCancelButton: true,
  });

  const [exec, isLoading] = useAsync({
    run: handleSubmit(submitHandler),
    onError: errorHandler,
  });

  return (
    <form className="login-form" onSubmit={exec}>
      {onDelete}
      <ErrorMessage
        name="form"
        render={({ message }) => (
          <div className="server-error">
            <span className="alt">*</span>
            {message}
          </div>
        )}
      />
      {authFormInputs.codename(
        {
          rules: {
            minLength: { value: 2, message: 'Too short' },
          },
        },
        true,
      )}
      {authFormInputs.password({
        rules: { validate: undefined, minLength: undefined },
      })}
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
