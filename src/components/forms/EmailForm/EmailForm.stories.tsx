import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useConfirmationModal } from '../../../hooks';
import { sleep } from '../../../utils';
import EmailForm, { EmailFormProps } from './EmailForm';

const Template: Story<Partial<EmailFormProps>> = ({ onSuccess, ...props }) => {
  const [modal, openModal] = useConfirmationModal({
    title: 'Success',
    message: 'Your email form has been submitted successfully.',
    confirmText: 'Okay',
    onConfirm:
      onSuccess ??
      (() => alert('Now something else happens after confirming success')),
    hideCancelButton: true,
  });
  return (
    <>
      <EmailForm
        onSubmit={async () => await sleep(2000)}
        onSuccess={openModal}
        {...props}
      />
      {modal}
    </>
  );
};

export const Default = Template.bind({});

export default {
  title: 'Forms/EmailForm',
  component: EmailForm,
  decorators: [
    (story) => {
      const methods = useForm();
      return <FormProvider {...methods}>{story()}</FormProvider>;
    },
  ],
} as Meta;
