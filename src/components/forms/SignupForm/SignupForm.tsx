import { ErrorMessage } from '@hookform/error-message';
import { useAsync } from '@story-squad/react-utils';
import { DateTime } from 'luxon';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth, Users } from '../../../api';
import { dataConstraints } from '../../../config';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type SignupFormProps = FormProps<Users.INewUser>;

export default function SignupForm({
  onSubmit,
  onError,
}: SignupFormProps): React.ReactElement {
  // Standard form handlers
  const { handleSubmit, setError, clearErrors, watch, trigger } =
    useFormContext();
  // Clearing form error
  const clearFormError = () => clearErrors('form');

  const [parentNeeded, setParentNeeded] = useState(false);
  const [page, setPage] = useState(1);

  // ref to password
  const password = useRef({});
  password.current = watch('password', '');

  // ref to watch dob
  const dob = useRef({});
  dob.current = watch('dob', '');

  useEffect(() => {
    if (dob.current) {
      setParentNeeded(calculate_age(dob.current.toString()));
    }
  }, [dob.current]);

  // Custom error handler
  const errorHandler = useCallback(
    onError ?? // If a custom error handler was provided, use it instead of our function
      ((error: unknown) => {
        if (error) {
          let message: string;
          if (Auth.isAxiosError(error) && error.response?.data) {
            message =
              error.response.data.message ??
              error.response.data.error ??
              error.message;
            if (
              message === 'Could not create duplicate' &&
              typeof error.response.data.field === 'string'
            ) {
              let fieldName: string;
              if (error.response.data.field === 'insensitive') {
                fieldName = 'codename';
              } else {
                fieldName = error.response.data.field;
              }
              message = `An account with this ${fieldName} already exists`;
              setError(fieldName, { type: 'manual', message });
            }
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
    onError: errorHandler,
  });

  // calculate age
  function calculate_age(dob: string) {
    const diff_ms = DateTime.local().toMillis() - new Date(dob).getTime();
    const age_dt = new Date(diff_ms);
    // return boolean to control display of parent email field
    return Math.abs(age_dt.getUTCFullYear() - 1970) < 13;
  }

  const goNext = async () => {
    const isValid = await trigger(
      ['firstname', 'lastname', 'codename', 'dob'],
      { shouldFocus: true },
    );
    if (isValid) setPage((prev) => prev + 1);
  };
  const goBack = async () => {
    setPage((prev) => prev - 1);
  };

  return (
    <form className="signup-form" onSubmit={exec} noValidate>
      {/* First page */}
      {page === 1 ? (
        <>
          {authFormInputs.firstname()}
          {authFormInputs.lastname()}
          {authFormInputs.codename({
            rules: {
              validate: {
                checkCharacters: (value) => {
                  return (
                    dataConstraints.codenamePattern.test(value) ||
                    'Only letters and numbers are allowed!'
                  );
                },
                checkLength: (value) => {
                  return (
                    value.length < 15 || 'Cannot be more than 15 characters!'
                  );
                },
              },
            },
          })}
          {authFormInputs.birthday()}
          <Button onClick={goNext} htmlType="button">
            Next
          </Button>
        </>
      ) : null}

      {/* Second page */}
      {page === 2 ? (
        <>
          {authFormInputs.email({
            rules: {
              pattern: {
                value: dataConstraints.emailPattern,
                message: 'Please enter a valid email address!',
              },
            },
          })}
          {parentNeeded ? authFormInputs.parentEmail() : null}
          {authFormInputs.password()}
          {authFormInputs.confirmPassword({
            rules: {
              validate: {
                checkPassword: (value) => {
                  return (
                    password.current === value || 'Passwords do not match.'
                  );
                },
              },
            },
          })}
          <Button onClick={goBack} htmlType="button" type="secondary">
            Back
          </Button>
          <ErrorMessage
            name="form"
            render={({ message }) => (
              <div className="server-error">
                <span className="red">*</span>
                {message}
              </div>
            )}
          />
          <Button
            disabled={isLoading}
            htmlType="submit"
            iconRight={isLoading && <LoadIcon />}
            onClick={clearFormError}
          >
            Sign Up
          </Button>
        </>
      ) : null}
    </form>
  );
}
