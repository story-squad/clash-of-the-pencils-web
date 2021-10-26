import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth } from '../../../api';
import { dataConstraints } from '../../../config';
import { useConfirmationModal } from '../../../hooks';
import { readError } from '../../../utils';
import { Button, LoadIcon } from '../../atoms';
import { Input } from '../../molecules';
import { FormProps } from '../formTypes';
import './styles/index.scss';

export type ForgotPasswordFormProps = FormProps<Auth.ResetEmailParams>;

export default function ForgotPasswordForm({
  onSubmit,
  onError,
  onSuccess,
}: ForgotPasswordFormProps): React.ReactElement {
  const { handleSubmit, setError, clearErrors } = useFormContext();
  const clearFormError = useCallback(() => clearErrors('form'), [clearErrors]);

  // Error handler for submit function
  const errorHandler = useCallback(
    (err: unknown) => {
      // Run the onError function if one was passed in
      onError?.(err);

      // Read the relevant message string out of the error
      const message = readError(err);
      // Create a form error object
      const formError = { type: 'manual', message };
      switch (message) {
        // Handle specific field errors here
        default:
          setError('form', formError);
      }
    },
    [onError],
  );

  const [modal, openSuccessModal] = useConfirmationModal({
    title: 'Success!',
    message: 'A password reset link has been sent to your email address.',
    hideCancelButton: true,
    confirmText: 'Okay',
    onConfirm: onSuccess,
  });

  const [submitForm, isSubmitting] = useAsync({
    run: async (data: Auth.ResetEmailParams) => {
      await onSubmit(data);
      openSuccessModal();
    },
    onError: errorHandler,
  });

  return (
    <>
      {modal}
      <form
        className="forgot-password-form"
        onSubmit={handleSubmit(submitForm)}
      >
        <Input
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
          rules={{
            required: 'Email is required!',
            pattern: {
              value: dataConstraints.emailPattern,
              message: 'Must be a valid email address',
            },
          }}
        />
        <Button
          onClick={clearFormError}
          disabled={isSubmitting}
          iconRight={isSubmitting && <LoadIcon />}
        >
          Submit
        </Button>
      </form>
    </>
  );
}
