import { ErrorMessage } from '@hookform/error-message';
import { useAsync } from '@story-squad/react-utils';
import { DateTime } from 'luxon';
import React, { useCallback, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth, Users } from '../../../api';
import { dataConstraints } from '../../../config';
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

  // ref to password
  const password = useRef({});
  password.current = watch('password', '');

  const parentNeeded = useMemo(() => calculate_age(watch('dob', '')), [watch]);

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
    onError: errorHandler,
  });

  // calculate age
  function calculate_age(dob: string) {
    const diff_ms = DateTime.local().toMillis() - new Date(dob).getTime();
    const age_dt = new Date(diff_ms);
    // return boolean to control display of parent email field
    return Math.abs(age_dt.getUTCFullYear() - 1970) < 13;
  }

  return (
    <form className="signup-form" onSubmit={exec} noValidate>
      <CleverButton htmlType="button" />
      <p className="alt-font">or</p>
      <p className="main-font">Sign In Using Email Address</p>
      <ErrorMessage
        name="form"
        render={({ message }) => <div className="server-error">{message}</div>}
      />
      {/* First page */}
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
              return value.length < 15 || 'Cannot be more than 15 characters!';
            },
          },
        },
      })}
      {authFormInputs.birthday()}
      {/* <Button onClick={nextPage} htmlType="button">
            Next
          </Button> */}
      {/* Second page */}
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
              return password.current === value || 'Passwords do not match.';
            },
          },
        },
      })}
      {/* <Button onClick={prevPage} htmlType="button" type="secondary">
            Back
          </Button> */}
      <Button
        disabled={isLoading}
        htmlType="submit"
        iconRight={isLoading && <LoadIcon />}
        onClick={clearFormError}
      >
        Sign Up
      </Button>
    </form>
  );
}
