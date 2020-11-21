import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Auth } from '../../../api';
import { token } from '../../../utils';
import { Modal } from '../../common';

export const Activation = (): React.ReactElement => {
  const [status, setStatus] = useState('Attempting to activate...');
  const { push } = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    const activationCode = search.slice(1).split('=')[1];
    console.log({ activationCode });

    if (activationCode) {
      Auth.activatedLogin(activationCode)
        .then((res) => {
          token.set(res.data.token);
          setStatus('You are now being redirected...');
          setTimeout(() => push('/dashboard'), 2000);
        })
        .catch(() => {
          setStatus('Activation failed. Redirecting to login...');
          setTimeout(() => push('/'), 2000);
        });
    } else {
      setStatus('No activation code provided. Redirecting to login...');
      setTimeout(() => push('/'), 2000);
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
