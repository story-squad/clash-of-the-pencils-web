import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { EditPersonal } from '../../forms';
import { AccountEditProps } from '../../forms/EditAccountForm/EditPasswordForm';
import { Modal, ModalProps } from '../../organisms';

export default function EditAccountModal({
  id,
  submithandler,
  ...props
}: Omit<ModalProps, 'component'> & {
  submithandler: AccountEditProps['onSubmit'];
  id: number;
  onSuccess?: () => void;
}): React.ReactElement {
  const methods = useForm();

  return (
    <Modal
      component={({ closeModal }) => (
        <FormProvider {...methods}>
          <EditPersonal
            onSubmit={submithandler}
            id={id}
            onCancel={closeModal}
          />
        </FormProvider>
      )}
      {...props}
    />
  );
}
