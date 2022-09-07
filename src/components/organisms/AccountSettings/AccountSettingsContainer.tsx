import React, { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Users } from '../../../api';
import { useConfirmationModal } from '../../../hooks';
import { auth } from '../../../state';
import { token } from '../../../utils';
import { Button } from '../../atoms';
import { AccountEditProps } from '../../forms/EditAccountForm/EditPasswordForm';
import { EditAccountModal, EditPersonalModal } from '../../modals';
import { AccountCards } from '../../molecules';
import reformatDate from './reformatDate';
import './styles/index.scss';

interface PasswordUpdateProps {
  submitHandler: AccountEditProps['onSubmit'];
  id: number;
}

export default function AccountContainer({
  id,
  submitHandler,
}: PasswordUpdateProps): React.ReactElement {
  const user = useRecoilValue(auth.user);
  // reformats date for display
  const newDate = reformatDate(user?.dob);
  const [edit, setEdit] = useState<boolean>(false);
  const [personal, setEditPersonal] = useState<boolean>(false);
  const logout = useSetRecoilState(auth.login);
  const setUserIsDeleted = useSetRecoilState(auth.userIsDeleted);

  const accountInfo = useCallback(() => {
    if (edit === false) setEdit(true);
  }, [setEdit, edit]);

  const personalInfo = useCallback(() => {
    if (personal === false) setEditPersonal(true);
  }, [setEdit, personal]);

  const onConfirm = () => {
    if (user) {
      Users.deleteUser({ id: user?.id });
      token.clear();
      logout();
      setUserIsDeleted(true);
    }
  };

  const [openDelete, deleteModal] = useConfirmationModal({
    title: 'Are you sure you want to delete your account?',
    message:
      'This action is permanent. If you would like to continue with this action, select Delete Account',
    confirmText: 'Delete Account',
    onConfirm: onConfirm,
  });

  return (
    <div className="account-wrapper">
      <h2>Account Settings</h2>
      {user && (
        <AccountCards
          codename={user.codename}
          dob={newDate}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          editPersonal={personalInfo}
          editInfo={accountInfo}
        />
      )}
      <EditAccountModal
        id={id}
        submithandler={submitHandler}
        isOpen={edit}
        setIsOpen={setEdit}
      />
      <EditPersonalModal
        id={id}
        submithandler={submitHandler}
        isOpen={personal}
        setIsOpen={setEditPersonal}
      />
      <div className="delete-wrapper">
        <Button onClick={deleteModal} type="secondary">
          Delete Account
        </Button>
      </div>
      {openDelete}
    </div>
  );
}
