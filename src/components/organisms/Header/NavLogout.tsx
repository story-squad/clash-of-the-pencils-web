import React from 'react';
import { useConfirmationModal } from '../../../hooks';
import useHeaderContext from './useHeaderContext';

export default function NavLogout(): React.ReactElement {
  const { logout, user } = useHeaderContext();
  const [modal, confirmLogout] = useConfirmationModal({
    title: 'Are you sure you want to log out?',
    cancelText: 'No',
    confirmText: 'Yes',
    onConfirm: logout,
  });

  if (!user) return <></>;
  else
    return (
      <>
        {modal}
        <li onClick={confirmLogout}>
          <a>Logout</a>
        </li>
      </>
    );
}
