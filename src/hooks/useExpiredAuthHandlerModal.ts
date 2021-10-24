import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { auth } from '../state';
import { readError } from '../utils';
import { useConfirmationModal } from './useConfirmationModal';

export default function useExpiredAuthHandlerModal(
  err: unknown,
): [ModalElement: ReactElement, errorMessage: string] {
  const { push } = useHistory();
  const logout = useSetRecoilState(auth.login);

  const [modal, openAuthExpiredModal] = useConfirmationModal({
    title: 'Login expired!',
    message: 'You have been logged out.',

    confirmText: 'Back to Dashboard',
    onConfirm: () => push('/'),

    cancelText: 'Go to Login',
    onCancel: () => push('/login'),
  });

  const expiredAuthHandler = useCallback(() => {
    logout();
    openAuthExpiredModal();
  }, []);

  const [message] = useMemo(() => [readError(err)], [err]);

  useEffect(() => {
    if (message === 'Token is expired') expiredAuthHandler();
  }, [err]);

  return [modal, message];
}
