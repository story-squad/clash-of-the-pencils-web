import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../../atoms';
import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal';

const Template: Story<ConfirmationModalProps> = ({
  message = 'Do you want to continue?',
  cancelText,
  confirmText,
  onConfirm = () => alert('Confirmed!'),
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => setIsOpen(true);

  return (
    <div>
      <Button onClick={openModal}>Open Modal</Button>
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

export default {
  title: 'Modals/ConfirmationModal',
  component: ConfirmationModal,
} as Meta;
