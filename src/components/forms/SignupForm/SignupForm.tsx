import { ErrorMessage } from '@hookform/error-message';
import { useAsync } from '@story-squad/react-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth, Users } from '../../../api';
import { dataConstraints } from '../../../config';
import { getAge, readError } from '../../../utils';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type SignupFormProps = FormProps<Users.INewUser> & { hideToS?: boolean };

export default function SignupForm({
  onSubmit,
  onError,
  hideToS = false,
}: SignupFormProps): React.ReactElement {
  // Standard form handlers
  const { handleSubmit, setError, clearErrors, watch } = useFormContext();
  // Clearing form error
  const clearFormError = () => clearErrors('form');

  const [parentNeeded, setParentNeeded] = useState(false);
  // const [page, setPage] = useState(1);

  // ref to password
  const password = useRef({});
  password.current = watch('password', '');

  // ref to watch dob
  const dob = useRef({});
  dob.current = watch('dob', '');

  useEffect(() => {
    if (dob.current) {
      setParentNeeded(getAge(dob.current.toString()) < 13);
    }
  }, [dob.current]);

  // Custom error handler
  const errorHandler = useCallback(
    onError ?? // If a custom error handler was provided, use it instead of our function
      ((error: unknown) => {
        const message = readError(error);
        const formError = { type: 'manual', message };

        switch (message) {
          case 'Could not create duplicate':
          default:
            setError('form', formError);
        }
        if (error) {
          let message: string;
          if (Auth.isAxiosError(error) && error.response?.data) {
            message = readError(error);
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
  const [asyncSubmitForm, isLoading] = useAsync({
    run: onSubmit,
    onError: errorHandler,
  });

  // const goNext = async () => {
  //   const isValid = await trigger(
  //     ['firstname', 'lastname', 'codename', 'dob'],
  //     { shouldFocus: true },
  //   );
  //   if (isValid) setPage((prev) => prev + 1);
  // };
  // const goBack = async () => {
  //   setPage((prev) => prev - 1);
  // };

  return (
    <form
      className="signup-form"
      onSubmit={handleSubmit(asyncSubmitForm)}
      noValidate
    >
      {/* First page */}
      {authFormInputs.firstname()}
      {authFormInputs.lastname()}
      {authFormInputs.codename({
        rules: {
          validate: {
            available: async (value) => {
              const available = await Users.isCodenameAvailable(value);
              return available || 'Codename is already taken';
            },
            checkCharacters: (value) => {
              return (
                dataConstraints.codenamePattern.test(value) ||
                'Only letters and numbers are allowed!'
              );
            },
            checkLength: (value) => {
              return value.length <= 32 || 'Cannot be more than 32 characters!';
            },
          },
        },
      })}
      {authFormInputs.birthday()}
      {/* <Button onClick={goNext} htmlType="button">
          Next
        </Button> */}

      {/* Second page */}
      {authFormInputs.email({
        rules: {
          validate: {
            available: async (value) => {
              const available = await Users.isEmailAvailable(value);
              return available || 'Email is already taken';
            },
          },
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
      {!hideToS && authFormInputs.termsCheckbox()}
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
      {/* <Button onClick={goBack} htmlType="button" type="secondary">
          Back
        </Button> */}
    </form>
  );
}
