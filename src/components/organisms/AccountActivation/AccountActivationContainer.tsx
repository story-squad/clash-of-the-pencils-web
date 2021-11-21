import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useConfirmationModal } from '../../../hooks';
import { auth } from '../../../state';
import { readError } from '../../../utils';
import { FormTypes } from '../../forms';
import AccountActivation from './AccountActivation';

export default function AccountActivationContainer(): React.ReactElement {
  const userIsUnderage = useRecoilValue(auth.userIsUnderage);
  const [successModal, openSuccessModal] = useConfirmationModal({
    title: 'Success!',
    message: 'Activation email sent. Check your inbox!',
    confirmText: 'Okay',
    hideCancelButton: true,
  });

  const [error, setError] = useState<string>();
  const [failureModal, openFailureModal] = useConfirmationModal({
    title: 'Uh oh!',
    message: error || <p>Failed to send activation email.</p>,
    confirmText: 'Okay',
    hideCancelButton: true,
  });

  const onError: FormTypes.FormOnError<unknown> = useCallback((err) => {
    const message = readError(err);
    setError(message);
    openFailureModal();
  }, []);

  return (
    <>
      {successModal}
      {failureModal}
      <AccountActivation
        onError={onError}
        onSuccess={openSuccessModal}
        sendToParent={userIsUnderage}
      />
    </>
  );
}
