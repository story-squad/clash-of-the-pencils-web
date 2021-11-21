import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useConfirmationModal } from '../../../hooks';
import { auth } from '../../../state';
import { EditPassword, PasswordFormProps } from '../../forms';
import { AccountCards } from '../../molecules';
import reformatDate from './reformatDate';
import './styles/index.scss';

interface PasswordUpdateProps {
  submitHandler: PasswordFormProps['onSubmit'];
  id: number;
}

export function EditAccountTest({
  id,
  submitHandler,
}: PasswordUpdateProps): React.ReactElement {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <EditPassword onSubmit={submitHandler} id={id} />
    </FormProvider>
  );
}

export default function AccountContainer({
  id,
  submitHandler,
}: PasswordUpdateProps): React.ReactElement {
  const user = useRecoilValue(auth.user);

  const newDate = reformatDate(user?.dob);

  const [accountModal, editInfo] = useConfirmationModal({
    title: 'Edit Account Info',
    message: <EditAccountTest id={id} submitHandler={submitHandler} />,

    hideConfirmButton: true,
    hideCancelButton: true,
  });

  const [personalModal, editPersonal] = useConfirmationModal({
    key: 1,
    title: 'Edit Profile Info',
    message: 'Let’s get you started.',

    confirmText: 'Confirm Changes',
    cancelText: 'Cancel',
  });

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
          editPersonal={editPersonal}
          editInfo={editInfo}
        />
      )}
      {accountModal}
      {personalModal}
    </div>
  );
}
