import React from 'react';
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
      component={() =>
        success === undefined ? (
          <Loader />
        ) : (
          <ActivationComponent success={success} />
        )
      }
      closable={false}
      {...props}
    />
  );
}

function ActivationComponent({
  success,
}: Required<ActivationModalProps>): React.ReactElement {
  return (
    <div className="activation-component">
      <h2>{`Activation ${success ? 'Successful' : 'Failed'}`}</h2>
      {success ? (
        <Loader message="You are being logged in" />
      ) : (
        <>
          <p>Could not log you in.</p>
          <Loader message="Redirecting" />
        </>
      )}
    </div>
  );
}
