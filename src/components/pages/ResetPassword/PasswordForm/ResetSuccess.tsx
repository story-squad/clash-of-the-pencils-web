import React from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../../state';
import { Modal } from '../../../common';

// use recoil state to pull
const ResetSuccess = (props: Modal.ModalComponentProps): React.ReactElement => {
  const setAuthOpen = useSetRecoilState(auth.authModalOpen);
  const setAuthIsLogin = useSetRecoilState(auth.authModalIsLogin);

  const openLogin = () => {
    props.closeModal();
    setAuthOpen(true);
    setAuthIsLogin(true);
  };

  return (
    <div className="reset-success">
      <p>Please log in to complete the reset process.</p>
      <button onClick={openLogin}>Login</button>
    </div>
  );
};

export default ResetSuccess;
