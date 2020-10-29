import React from 'react';
import './modal.scss';

const Modal = ({ component: Component, visible, setVisible, ...props }) => {
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
