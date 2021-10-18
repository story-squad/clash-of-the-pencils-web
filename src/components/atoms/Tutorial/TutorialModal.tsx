import React from 'react';
import { Button } from '..';
import { Modal, ModalProps } from '../../organisms';
import './styles/tutorialModal.scss';
import { TutorialProps } from './Tutoiral';

export const TutorialModal = ({
  noTutorial,
  runTutorial,
  setIsOpen,
  ...props
}: Omit<ModalProps, 'component'> & TutorialProps): React.ReactElement => {
  return (
    <Modal
      component={() => (
        <TutorialModalComponent
          noTutorial={noTutorial}
          runTutorial={runTutorial}
        />
      )}
      setIsOpen={setIsOpen}
      closable={true}
      {...props}
    />
  );
};

interface TutorialInterfaceModalProps {
  noTutorial: () => void;
  runTutorial: () => void;
}

const TutorialModalComponent = ({
  runTutorial,
  noTutorial,
}: TutorialInterfaceModalProps &
  Omit<
    ModalProps,
    'component' | 'isOpen' | 'setIsOpen'
  >): React.ReactElement => {
  return (
    <div className="tutorial-modal">
      {/* Temp text placeholder */}
      <h1>Hi Brandon, welcome to Clash of the Pencils!</h1>
      <p>
        Let’s get you started by going through your dashboard. Do you want to
        run the tutorial?
      </p>
      <div className="button-box">
        <Button onClick={() => runTutorial()}>Yes, Start</Button>
        <Button onClick={() => noTutorial()}>No, Thanks</Button>
      </div>
    </div>
  );
};

export default TutorialModal;
