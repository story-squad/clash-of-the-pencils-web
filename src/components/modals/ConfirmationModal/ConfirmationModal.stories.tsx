import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../../atoms';
import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal';

const Template: Story<
  ConfirmationModalProps & {
    buttonText?: string;
    modalStartsOpen?: boolean;
  }
> = ({
  message = 'Do you want to continue?',
  cancelText,
  confirmText,
  onConfirm = () => alert('Confirmed!'),
  buttonText = 'Open Modal',
  modalStartsOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(modalStartsOpen);
  const openModal = () => setIsOpen(true);

  return (
    <div>
      <Button onClick={openModal}>{buttonText}</Button>
      <ConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={onConfirm}
        message={message}
        cancelText={cancelText}
        confirmText={confirmText}
      />
    </div>
  );
};

export const Default = Template.bind({});

export const Logout = Template.bind({});
Logout.args = {
  cancelText: 'No',
  confirmText: 'Yes',
  message: 'Are you sure you want to log out?',
  onConfirm: () => alert('Logged out!'),
  buttonText: 'Log Out',
  modalStartsOpen: false,
};

export default {
  title: 'Modals/ConfirmationModal',
  component: ConfirmationModal,
} as Meta;
