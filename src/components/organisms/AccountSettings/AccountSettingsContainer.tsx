import { useClickOutside, useKey } from '@story-squad/react-utils';
import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { orangeCloseButton } from '../../../assets';
import { auth } from '../../../state';
import { EditPassword } from '../../forms';
import { AccountEditProps } from '../../forms/EditAccountForm/EditPasswordForm';
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

  const closeModal = useCallback(() => {
    setEdit(false);
  }, [setEdit]);

  // const [errors, setErrors] = useRecoilState(account.errors);
  const methods = useForm();

  const [ref] = useClickOutside({
    onClick: closeModal,
    isActive: edit,
  });

  useKey({ action: closeModal, key: 'Escape' });

  const editInfo = () => {
    setEdit(true);
  };

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
          // editPersonal={editPersonal}
          editInfo={editInfo}
        />
      )}
      {edit && (
        <div className="edit-info-container">
          <div className="edit-info-modal" ref={ref}>
            <FormProvider {...methods}>
              <EditPassword
                onSubmit={submitHandler}
                id={id}
                closeModal={closeModal}
              />
            </FormProvider>
            <img
              src={orangeCloseButton}
              className="modal-close-button"
              onClick={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
