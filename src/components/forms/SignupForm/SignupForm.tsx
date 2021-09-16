import { ErrorMessage } from '@hookform/error-message';
import { useAsync } from '@story-squad/react-utils';
import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth, Users } from '../../../api';
import { Button, CleverButton, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type SignupFormProps = FormProps<Users.INewUser>;

export default function SignupForm({
  onSubmit,
  onError,
}: SignupFormProps): React.ReactElement {
  // Standard form handlers
  const { handleSubmit, setError, clearErrors, watch } = useFormContext();
  // Clearing form error
  const clearFormError = () => clearErrors('form');
  // Custom error handler
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
  // Using useAsync for easier async render control
  const [exec, isLoading] = useAsync({
    asyncFunction: handleSubmit(onSubmit),
    errorHandler,
  });

  // Form Pagination
  const [pageNum, setPageNum] = useState(1);
  // Form State Handling
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  // Persist form state when changing the page
  const saveFormState = useCallback(() => {
    const currentValues = watch();
    setFormValues((prev) => ({ ...prev, ...currentValues }));
  }, [watch, setFormValues, pageNum]);
  // Page change handlers
  const nextPage = () => {
    setPageNum((prev) => {
      if (prev === 1) {
        saveFormState();
        return 2;
      } else return prev;
    });
  };
  const prevPage = () => {
    setPageNum((prev) => {
      if (prev === 2) {
        saveFormState();
        return 1;
      } else return prev;
    });
  };

  // Clear errors after page changes (This fixes a bug)
  useEffect(clearErrors, [pageNum]);

  // Debug logger
  useEffect(() => console.log(formValues), [formValues]);

  return (
    <form className="signup-form" onSubmit={exec}>
      <CleverButton htmlType="button" />
      <p className="alt-font">or</p>
      <p className="main-font">Sign In Using Email Address</p>
      <ErrorMessage
        name="form"
        render={({ message }) => <div className="server-error">{message}</div>}
      />
      {pageNum === 1 ? (
        <>
          {/* First page */}
          {authFormInputs.firstname({})}
          {authFormInputs.lastname({})}
          {authFormInputs.codename({})}
          {authFormInputs.birthday({})}
          <Button onClick={nextPage} htmlType="button">
            Next
          </Button>
        </>
      ) : (
        <>
          {/* Second page */}
          {authFormInputs.email({})}
          {authFormInputs.password({})}
          {authFormInputs.confirmPassword({})}
          <Button onClick={prevPage} htmlType="button" type="secondary">
            Back
          </Button>
          <Button
            disabled={isLoading}
            htmlType="submit"
            iconRight={isLoading && <LoadIcon />}
            onClick={clearFormError}
          >
            Sign In
          </Button>
        </>
      )}
    </form>
  );
}
