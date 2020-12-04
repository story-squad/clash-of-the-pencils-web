import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../common';

export const Activation = (): React.ReactElement => {
  const { push } = useHistory();

  useEffect(() => {
    setTimeout(() => {
      push('/login');
    }, 3000);
  }, []);

  return (
    <Modal.Component
      visible={true}
      setVisible={() => null}
      component={ActivationMessage}
      centered={true}
      closable={false}
      title="Success!"
    />
  );
};

const ActivationMessage = () => {
  return (
    <>
      <p className="activation">Activation complete!</p>
      <p className="activation">Redirecting to login...</p>
    </>
  );
};

export default Activation;
