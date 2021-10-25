import { useAsync } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Auth } from '../../../api';
import { useConfirmationModal } from '../../../hooks';
import { readError } from '../../../utils';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';

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
    run: handleSubmit(onSubmit),
    onError: errorHandler,
    onSuccess: openSuccessModal,
  });

  return (
    <form className="forgot-password-form" onSubmit={submitForm}>
      {modal}
      <Button
        onClick={clearFormError}
        disabled={isSubmitting}
        iconRight={isSubmitting && <LoadIcon />}
      >
        Submit
      </Button>
    </form>
  );
}
