import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
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

  const accountInfo = useCallback(() => {
    if (edit === false) setEdit(true);
  }, [setEdit, edit]);

  const personalInfo = useCallback(() => {
    if (personal === false) setEditPersonal(true);
  }, [setEdit, personal]);

  return (
    <div className="account-wrapper">
      <h2>Account Settings</h2>
      {user && (
        <AccountCards
          codename={user.codename}
          dob={newDate}
          email={user.email}
          firstname={user.firstname}
          lastname={user.lastname}
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
    </div>
  );
}
