import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../../common';

export const Activation = (): React.ReactElement => {
  const { push } = useHistory();
  const { search } = useLocation();
  const [success, setSuccess] = useState<boolean>();
  const login = useSetRecoilState(auth.isLoggedIn);

  useEffect(() => {
    const parsedParams = parse(search);
    if (parsedParams.authToken && typeof parsedParams.authToken === 'string') {
      setSuccess(true);
      login(parsedParams.authToken);
      setTimeout(() => {
        push('/game');
      }, 3000);
    } else {
      setSuccess(false);
      setTimeout(() => {
        push('/');
      }, 3000);
    }
  }, []);

  return (
    <Modal.Component
      className="activation"
      visible={true}
      setVisible={() => null}
      component={() => <ActivationMessage {...{ success }} />}
      centered={true}
      closable={false}
    />
  );
};

const ActivationMessage = ({ success }: ActivationMessageProps) => {
  return (
    <div className="activation-wrapper">
      <h2>Activation successful!</h2>
      {success ? <p>You have been logged in.</p> : <p>Could not log you in.</p>}
      <h3>Redirecting...</h3>
    </div>
  );
};

interface ActivationMessageProps {
  success?: boolean;
}

export default Activation;
