import React from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Loader } from '../../molecules';
import { Modal, ModalProps } from '../../organisms';
import './styles/index.scss';

export interface ActivationModalProps {
  success?: boolean;
}

export default function ActivationModal({
  success,
  ...props
}: Omit<ModalProps, 'component' | 'closable'> &
  ActivationModalProps): React.ReactElement {
  return (
    <Modal
      component={() => <ActivationComponent success={success} />}
      closable={false}
      {...props}
    />
  );
}

function ActivationComponent({
  success,
}: ActivationModalProps): React.ReactElement {
  const user = useRecoilValue(auth.user);
  return (
    <div className="activation-component">
      {success === undefined ? (
        <Loader message="Activating your account" />
      ) : (
        <>
          <h2>{`Activation ${success ? 'Successful' : 'Failed'}`}</h2>
          {success ? (
            <>
              {user && <p>Welcome, {user.codename}</p>}
              <Loader message="You are being logged in" />
            </>
          ) : (
            <>
              <p>Could not log you in.</p>
              <Loader message="Redirecting" />
            </>
          )}
        </>
      )}
    </div>
  );
}
