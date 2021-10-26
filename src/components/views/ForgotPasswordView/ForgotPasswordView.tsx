import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Auth } from '../../../api';
import { useConfirmationModal } from '../../../hooks';
import { readError } from '../../../utils';
import { EmailForm } from '../../forms';
import { DashboardTemplate } from '../../templates';
import './styles/index.scss';

export interface ForgotPasswordViewProps {
  onSubmit?: ForgotPasswordViewOnSubmit;
  openLogin: () => void;
}
type ForgotPasswordViewOnSubmit = (
  data: Auth.ResetParams,
) => unknown | Promise<unknown>;

export default function ForgotPasswordView({
  openLogin,
  onSubmit,
}: ForgotPasswordViewProps): React.ReactElement {
  const methods = useForm();

  // Success Handling
  const [successModal, openSuccessModal] = useConfirmationModal({
    title: 'Request Submitted!',
    message:
      'If you  provided a valid email address, you should receive an email with a reset link shortly.',
    hideCancelButton: true,
    confirmText: 'Okay',
    onConfirm: openLogin,
  });

  // Error Handling
  const [errMessage, setErrMessage] = useState<string>();
  const [failureModal, openFailureModal] = useConfirmationModal({
    title: 'Uh oh!',
    message: errMessage || 'The email could not be sent to the given address.',
    confirmText: 'Okay',
    hideCancelButton: true,
  });

  // Error handler for submit function
  const errorHandler = useCallback(
    async (err: unknown) => {
      // Read the relevant message string out of the error
      const message = readError(err);
      switch (message) {
        case 'Email not found':
          /**
           * In the case of the user typing in an incorrect email, technically we don't want
           * to tell them that it failed. We want it to appear successful if it fails because
           * an invalid email was provided. They won't receive an email though.
           */
          openSuccessModal();
          break;
        // Handle specific field errors here
        default:
          setErrMessage(message);
          openFailureModal();
      }
    },
    [setErrMessage, openSuccessModal, openFailureModal],
  );

  const submitHandler: ForgotPasswordViewOnSubmit = useCallback(
    onSubmit ??
      (async (data) => {
        await Auth.getPasswordReset(data);
        openSuccessModal();
      }),
    [onSubmit, openLogin],
  );

  return (
    <DashboardTemplate className="forgot-password-view" useStorySquadHeader>
      {successModal}
      {failureModal}
      <div className="forgot-password-header">
        <h2>Forgot Your Password?</h2>
        <p>
          Enter your email address. If your email address is correct, we will
          send you an email with a link to reset your&nbsp;password!
        </p>
      </div>
      <FormProvider {...methods}>
        <EmailForm
          onSubmit={submitHandler}
          onSuccess={openSuccessModal}
          onError={errorHandler}
        />
      </FormProvider>
    </DashboardTemplate>
  );
}
