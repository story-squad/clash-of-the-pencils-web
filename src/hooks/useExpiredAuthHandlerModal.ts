import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '../state';
import { readError } from '../utils';
import { useConfirmationModal } from './useConfirmationModal';
import useOpen from './useOpen';

export default function useExpiredAuthHandlerModal(
  err: unknown,
): [ModalElement: ReactElement, errorMessage: string] {
  const logout = useSetRecoilState(auth.login);
  const openDash = useOpen('/');
  const openLogin = useOpen('/login');

  const [modal, openAuthExpiredModal] = useConfirmationModal({
    title: 'Login expired!',
    message: 'You have been logged out.',

    confirmText: 'Back to Dashboard',
    onConfirm: openDash,

    cancelText: 'Go to Login',
    onCancel: openLogin,
  });

  const expiredAuthHandler = useCallback(() => {
    logout();
    openAuthExpiredModal();
  }, []);

  const [message] = useMemo(() => [readError(err)], [err]);

  useEffect(() => {
    if (message === 'Token is expired') expiredAuthHandler();
    else if (message.includes('Could not find user with id'))
      expiredAuthHandler();
  }, [err]);

  return [modal, message];
}
