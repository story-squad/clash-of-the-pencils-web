import React from 'react';
import { Button } from '../../atoms';
import { Modal, ModalComponentProps, ModalProps } from '../../organisms';
import './styles/index.scss';

export interface ConfirmationModalProps {
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onError?: (err: unknown) => void;
  cancelText?: React.ReactNode;
  confirmText?: React.ReactNode;
  message?: React.ReactNode;
  title?: React.ReactNode;
  hideCancelButton?: boolean;
}

export default function ConfirmationModal({
  closable,
  isOpen,
  setIsOpen,
  ...props
}: ConfirmationModalProps & Omit<ModalProps, 'component'>): React.ReactElement {
  return (
    <Modal
      component={({ closeModal }) => (
        <ConfirmationModalComponent closeModal={closeModal} {...props} />
      )}
      closable={closable}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}

function ConfirmationModalComponent({
  onConfirm,
  closeModal,
  message,
  title,
  cancelText = 'Cancel',
  confirmText = 'Okay',
  onCancel,
  onError,
  hideCancelButton = false,
}: ConfirmationModalProps & ModalComponentProps): React.ReactElement {
  const confirmHandler = async () => {
    try {
      await onConfirm?.();
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
      {title && typeof title === 'string' ? <h2>{title}</h2> : title}
      {message && typeof message === 'string' ? <p>{message}</p> : message}
      <div className="button-wrapper">
        {!hideCancelButton && (
          <Button onClick={cancelHandler} type="secondary">
            {cancelText}
          </Button>
        )}
        <Button onClick={confirmHandler}>{confirmText}</Button>
      </div>
    </div>
  );
}
