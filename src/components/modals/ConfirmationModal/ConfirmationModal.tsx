import React from 'react';
import { Button } from '../../atoms';
import { Modal, ModalComponentProps, ModalProps } from '../../organisms';
import './styles/index.scss';

export interface ConfirmationModalProps {
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onError?: (err: unknown) => void;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  message: string;
}

export default function ConfirmationModal({
  message,
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
  onError,
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
          onCancel={onCancel}
          onError={onError}
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
  onCancel,
  onError,
}: ConfirmationModalProps & ModalComponentProps): React.ReactElement {
  const confirmHandler = async () => {
    try {
      await onConfirm();
      closeModal();
    } catch (e) {
      onError?.(e);
    }
  };
  const cancelHandler = async () => {
    try {
      await onCancel?.();
      closeModal();
    } catch (e) {
      onError?.(e);
    }
  };
  return (
    <div className="confirmation-modal">
      <p>{message}</p>
      <div className="button-wrapper">
        <Button onClick={cancelHandler} type="secondary">
          {cancelText}
        </Button>
        <Button onClick={confirmHandler}>{confirmText}</Button>
      </div>
    </div>
  );
}
