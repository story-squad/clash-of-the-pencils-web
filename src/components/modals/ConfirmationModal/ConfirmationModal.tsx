import React from 'react';
import { Button } from '../../atoms';
import { Modal, ModalComponentProps, ModalProps } from '../../organisms';
import './styles/index.scss';

export interface ConfirmationModalProps {
  onConfirm: () => void | Promise<void>;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  message: string;
}

export default function ConfirmationModal({
  onConfirm,
  message,
  cancelText,
  confirmText,
  ...props
}: ConfirmationModalProps & Omit<ModalProps, 'component'>): React.ReactElement {
  return (
    <Modal
      component={({ closeModal }) => (
        <ConfirmationModalComponent
          closeModal={closeModal}
          onConfirm={onConfirm}
          message={message}
          cancelText={cancelText}
          confirmText={confirmText}
        />
      )}
      {...props}
    />
  );
}

function ConfirmationModalComponent({
  onConfirm,
  closeModal,
  message,
  cancelText = 'Cancel',
  confirmText = 'Okay',
}: ConfirmationModalProps & ModalComponentProps): React.ReactElement {
  const confirmAndCloseModal = async () => {
    await onConfirm();
    closeModal();
  };
  return (
    <div className="confirmation-modal">
      <p>{message}</p>
      <div className="button-wrapper">
        <Button onClick={closeModal} type="secondary">
          {cancelText}
        </Button>
        <Button onClick={confirmAndCloseModal}>{confirmText}</Button>
      </div>
    </div>
  );
}
