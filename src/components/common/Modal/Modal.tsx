import React from 'react';

interface ComponentProps {
  setVisible: React.Dispatch<boolean>;
}

interface ModalProps {
  component: React.ComponentType<ComponentProps>;
  visible: boolean;
  setVisible: React.Dispatch<boolean>;
}

const Modal = ({
  component: Component,
  visible,
  setVisible,
  ...props
}: ModalProps): React.ReactElement => {
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <div
      className={`custom-modal-wrapper${visible ? '' : ' hidden'}`}
      onClick={() => setVisible(false)}
    >
      <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
        <Component setVisible={setVisible} {...props} />
        <div className="close-button" onClick={closeModal}>
          &times;
        </div>
      </div>
    </div>
  );
};
export default Modal;
