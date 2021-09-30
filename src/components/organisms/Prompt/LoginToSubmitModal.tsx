import React from 'react';
import { Button } from '../../atoms';
import { Modal, ModalProps } from '../Modal';
import './styles/loginToVoteModal.scss';

export default function LoginToSubmitModal({
  isOpen,
  setIsOpen,
  openLoginPage,
}: Omit<ModalProps, 'component'> & {
  openLoginPage: () => void;
}): React.ReactElement {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      component={({ closeModal }) => (
        <div className="must-login-to-vote">
          <h2>You must log in to vote!</h2>
          <div className="button-wrapper">
            <Button onClick={closeModal} type="secondary">
              Cancel
            </Button>
            <Button onClick={openLoginPage}>Go to Login</Button>
          </div>
        </div>
      )}
    />
  );
}
