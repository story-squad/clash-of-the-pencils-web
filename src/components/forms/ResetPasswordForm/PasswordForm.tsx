import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessageType } from '../../../api/Auth';
import { useConfirmationModal } from '../../../hooks';
import useAsync from '../../../hooks/useAsync';
import { readError } from '../../../utils';
import { Button, LoadIcon } from '../../atoms';
import { FormProps } from '../formTypes';
import { authFormInputs } from '../inputs';
import './styles/index.scss';

export type PasswordFormProps = FormProps<PasswordFormFields>;

export interface PasswordFormFields {
  password: string;
  confirmPassword?: string;
}

export default function PasswordForm({
  onSubmit,
  onError,
  onSuccess,
}: PasswordFormProps): React.ReactElement {
  const { setError, handleSubmit, clearErrors, watch } = useFormContext();
  const clearFormError = useCallback(() => clearErrors('form'), [clearErrors]);

  // Success Handling
  const [successModal, openSuccessModal] = useConfirmationModal({
    title: 'Success!',
    message: 'Your password has been reset.',
    hideCancelButton: true,
    confirmText: 'Back to Login',
    onConfirm: onSuccess,
  });

  // Error Handling
  const [errMessage, setErrMessage] = useState<string>();
  const [failureModal, openFailureModal] = useConfirmationModal({
    title: 'Uh oh!',
    message:
      errMessage ?? 'We were unable to reset your password at this time.',
    confirmText: 'Okay',
    hideCancelButton: true,
  });

  const errorHandler = useCallback(
    async (err: ErrorMessageType) => {
      // Run the passed-in error function
      await onError?.(err);

      const message = readError(err);
      const formError = { type: 'manual', message };
      switch (message) {
        case 'Cannot send another email so soon':
          setErrMessage("It's too soon to request another password reset.");
          openFailureModal();
          break;
        default:
          setError('form', formError);
          openFailureModal();
      }
    },
    [onError],
  );

  const [submitForm, isSubmitting] = useAsync({
    asyncFunction: async (data: PasswordFormFields) => {
      await onSubmit({ password: data.password });
    },
    onError: errorHandler,
    onSuccess: openSuccessModal,
  });

  return (
    <>
      {failureModal}
      {successModal}
      <form
        className="password-form"
        onSubmit={handleSubmit((data) => {
          const userData = { password: data.password };

          submitForm(userData);
        })}
      >
        {authFormInputs.password()}
        {authFormInputs.confirmPassword({
          rules: {
            validate: {
              matches: (confirmValue) =>
                watch('password') === confirmValue || 'Passwords must match!',
            },
          },
        })}
        <Button
          onClick={clearFormError}
          disabled={isSubmitting}
          iconRight={isSubmitting && <LoadIcon />}
        >
          Reset Password
        </Button>
      </form>
    </>
  );
}
