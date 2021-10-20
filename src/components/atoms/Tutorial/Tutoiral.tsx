import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { app } from '../../../state';
import { Button } from '../Button';
import './styles/index.scss';
import { tutorialMessages } from './tutorialMessages';
import TutorialModal from './TutorialModal';

export interface TutorialProps {
  noTutorial: () => void;
  runTutorial: () => void;
}

const Tutorial = (): React.ReactElement => {
  const [messageIndex, setMessage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useRecoilState(app.tutorial.isOpen);
  const [showTutorial, setShowTutorial] = useState(false);
  // can try and add another component and move all logic to it and render based on loading there
  console.log(tutorialMessages.length);
  const nextItem = () => {
    setMessage((prev) => {
      if (prev < tutorialMessages.length - 1) {
        return prev + 1;
      } else {
        setShowTutorial(false);
        setModalIsOpen(false);
        return prev;
      }
    });
  };

  const noTutorial = () => {
    setModalIsOpen(false);
  };

  const runTutorial = () => {
    setShowTutorial(true);
  };

  console.log(modalIsOpen, showTutorial);
  return (
    <>
      <TutorialModal
        setIsOpen={setModalIsOpen}
        isOpen={modalIsOpen && !showTutorial}
        noTutorial={noTutorial}
        runTutorial={runTutorial}
      />
      {showTutorial && (
        <div className="tutorial-wrapper">
          <div className="tutorial-container">
            {tutorialMessages[messageIndex].arrow && (
              <img
                className="arrow"
                src={tutorialMessages[messageIndex].arrow}
              />
            )}
            <div className="dashboard-tutorial-content">
              <p>{tutorialMessages[messageIndex].message}</p>
              <div>
                <Button onClick={() => nextItem()}>Next</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tutorial;
