import React from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../../common';

const ResetPageSuccess = ({
  openAuthModalAfter = false,
  ...props
}: ResetPageSuccessProps): React.ReactElement => {
  const setAuthOpen = useSetRecoilState(auth.authModalOpen);
  const setAuthIsLogin = useSetRecoilState(auth.authModalIsLogin);

  const openLogin = () => {
    props.closeModal();
    if (openAuthModalAfter) {
      setAuthOpen(true);
      setAuthIsLogin(true);
    }
  };

  return (
    <div className="reset-page-success">
      <p>{props.message}</p>
      <button onClick={openLogin}>{props.buttonText}</button>
    </div>
  );
};

interface ResetPageSuccessProps extends Modal.ModalComponentProps {
  message: string;
  buttonText: string;
  openAuthModalAfter?: boolean;
}

export default ResetPageSuccess;
