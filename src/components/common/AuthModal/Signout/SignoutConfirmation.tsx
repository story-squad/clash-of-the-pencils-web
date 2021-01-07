import React from 'react';
import { Modal } from '../../Modal';

const SignoutConfirmation = (
  props: SignoutConfirmationProps,
): React.ReactElement => {
  return (
    <div className="signout-confirmation">
      <p>Are you sure you&apos;d like to sign out?</p>
      <div className="button-row">
        <button onClick={() => props.confirmSignout(true)}>Yes</button>
        <button
          className="no-button"
          onClick={() => props.confirmSignout(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

interface SignoutConfirmationProps extends Modal.ModalComponentProps {
  confirmSignout: (arg: boolean) => void;
}

export default SignoutConfirmation;
