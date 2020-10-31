import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from '../../../api';
import { setToken } from '../../../utils';
import { Modal } from '../../common';

export const Activation = (): React.ReactElement => {
  const [status, setStatus] = useState('');
  const { push } = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const activationCode = pathname.split('/activated/')[1];

    if (activationCode) {
      auth
        .activatedLogin(activationCode)
        .then((res) => {
          setToken(res.data.token);
          setStatus('You are now being redirected...');
          setTimeout(() => push('/dashboard'), 2000);
        })
        .catch(() => {
          setStatus('Activation failed. Redirecting to login...');
        });
    }
  }, []);

  return (
    <Modal
      visible={true}
      setVisible={() => null}
      component={() => <ActivationMessage text={status} />}
      centered={true}
      closable={false}
    />
  );
};

const ActivationMessage = ({ text }: { text: string }) => {
  return <p className="activation">{text}</p>;
};

export default Activation;
