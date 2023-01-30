import React, { useCallback, useState } from 'react';
import { Auth } from '../../../api';
import { ErrorMessageType } from '../../../api/Auth';
import { useConfirmationModal, useOpen } from '../../../hooks';
import { readError } from '../../../utils';
import ForgotCodenameView, {
  ForgotCodenameViewProps,
} from './ForgotCodenameView';

export default function ForgotCodenameViewContainer({
  onSubmit = Auth.getCodenameReminder,
}: Pick<Partial<ForgotCodenameViewProps>, 'onSubmit'>): React.ReactElement {
  const openLogin = useOpen('/login');

  // Success Handling
  const [successModal, openSuccessModal] = useConfirmationModal({
    title: 'Request Submitted!',
    message:
      'If you provided a valid email address, you should receive an email with your codename shortly.',
    hideCancelButton: true,
    confirmText: 'Okay',
    onConfirm: openLogin,
  });

  // Error Handling
  const [errMessage, setErrMessage] = useState<string>();
  const [failureModal, openFailureModal] = useConfirmationModal({
    title: 'Uh oh!',
    message: errMessage || (
      <p>The email could not be sent to the given address.</p>
    ),
    confirmText: 'Okay',
    hideCancelButton: true,
  });

  // Error handler for submit function
  const onError = useCallback(
    async (err: ErrorMessageType) => {
      // Read the relevant message string out of the error
      const message = readError(err);
      switch (message) {
        // Handle specific field errors here
        default:
          setErrMessage(message);
          openFailureModal();
      }
    },
    [setErrMessage, openFailureModal],
  );
  return (
    <>
      {successModal}
      {failureModal}
      <ForgotCodenameView
        onSubmit={onSubmit}
        onError={onError}
        onSuccess={openSuccessModal}
      />
    </>
  );
}
