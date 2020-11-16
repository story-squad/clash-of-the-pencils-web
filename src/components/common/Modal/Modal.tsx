import React from 'react';

import { MdClose } from 'react-icons/md';

const Modal = ({
  component: Component,
  closable = true,
  centered = false,
  visible,
  setVisible,
  ...props
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
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <Component setVisible={setVisible} {...props} />
        {closable && (
          <div className="close-button" onClick={closeModal}>
            <MdClose />
          </div>
        )}
      </div>
    </div>
  );
};

interface ModalProps {
  component: React.ComponentType<ComponentProps>;
  closable?: boolean;
  centered?: boolean;
  visible: boolean;
  setVisible: React.Dispatch<boolean>;
}
interface ComponentProps {
  setVisible: React.Dispatch<boolean>;
}

export default Modal;
