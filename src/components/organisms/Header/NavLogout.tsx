import React from 'react';
import { useConfirmationModal } from '../../../hooks';

export interface NavLogoutProps {
  logout: () => void;
}

export default function NavLogout({
  logout,
}: NavLogoutProps): React.ReactElement {
  const [modal, confirmLogout] = useConfirmationModal({
    title: 'Are you sure you want to log out?',
    cancelText: 'No',
    confirmText: 'Yes',
    onConfirm: logout,
  });

  return (
    <>
      {modal}
      <li onClick={confirmLogout}>
        <a>Logout</a>
      </li>
    </>
  );
}
