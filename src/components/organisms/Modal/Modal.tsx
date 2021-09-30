import { classnames, useClickOutside, useKey } from '@story-squad/react-utils';
import React, { useCallback } from 'react';
import { orangeCloseButton } from '../../../assets';
import { stopPropagation } from '../../../utils';
import './styles/index.scss';

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  component: React.ComponentType<ModalComponentProps>;
  closable?: boolean;
}

export interface ModalComponentProps {
  closeModal: () => void;
}

export default function Modal({
  component: Component,
  isOpen,
  setIsOpen,
  closable = true,
}: ModalProps): React.ReactElement {
  const closeModal = useCallback(() => {
    if (closable) setIsOpen(false);
  }, [setIsOpen, closable]);

  const [ref] = useClickOutside({
    onClick: closeModal,
    isActive: isOpen && closable,
  });

  useKey({ action: closeModal, key: 'Escape' });

  return (
    <div
      className={classnames('modal-wrapper', !isOpen && 'hidden', { closable })}
    >
      <div className={classnames('modal')} onClick={stopPropagation} ref={ref}>
        {closable && (
          <img
            src={orangeCloseButton}
            className="modal-close-button"
            onClick={closeModal}
          />
        )}
        <div className="modal-content">
          <Component closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
}
