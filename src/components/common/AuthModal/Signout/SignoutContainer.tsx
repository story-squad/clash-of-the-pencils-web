import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../../state';
import { Modal } from '../../Modal';
import Signout from './Signout';
import SignoutConfirmation from './SignoutConfirmation';

const SignoutContainer = (
  props: Modal.ModalComponentProps,
): React.ReactElement => {
  const [confirmed, setConfirmed] = useState(false);
  const setModalOpen = useSetRecoilState(auth.authModalOpen);
  const setModalIsLogout = useSetRecoilState(auth.authModalIsLogout);

  const confirmSignout = (conf: boolean) => {
    setConfirmed(conf);
    setModalOpen(false);
    setTimeout(() => {
      setModalIsLogout(false);
    }, 600);
  };

  return confirmed ? (
    <Signout />
  ) : (
    <SignoutConfirmation {...props} confirmSignout={confirmSignout} />
  );
};

export default SignoutContainer;
