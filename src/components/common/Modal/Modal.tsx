import React from 'react';
import { MdClose } from 'react-icons/md';

export const Component = ({
  component: Component,
  closable = true,
  centered = false,
  visible,
  setVisible,
  className,
  title = '',
}: ModalProps): React.ReactElement => {
  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div
      className={`modal-wrapper${visible ? '' : ' hidden'}${
        centered ? ' centered' : ''
      }`}
      onClick={closable ? () => setVisible(false) : () => null}
    >
      <div
        className={`modal${className ? ' ' + className : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          {closable && (
            <div className="close-button" onClick={closeModal}>
              <MdClose />
            </div>
          )}
        </div>
        <div className="modal-content">
          <Component closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  component: React.ComponentType<ModalComponentProps>;
  closable?: boolean;
  centered?: boolean;
  visible: boolean;
  setVisible: React.Dispatch<boolean>;
  className?: string;
  title?: string;
}

export interface ModalComponentProps {
  closeModal: () => void;
}
