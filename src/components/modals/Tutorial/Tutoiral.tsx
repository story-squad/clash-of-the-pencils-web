import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { app } from '../../../state';
import { $ } from '../../../utils';
import { Button } from '../../atoms/Button';
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
  const [position, setPosition] = useState<DOMRect>();
  const router = useHistory();
  // can try and add another component and move all logic to it and render based on loading there
  const nextItem = () => {
    setMessage((prev) => {
      if (prev < tutorialMessages.length - 1) {
        return prev + 1;
      } else {
        setShowTutorial(false);
        setModalIsOpen(false);
        router.push('/schedule');
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

  // Finds and gets the IDS that are on the page linked to the tutorial and positions the page based on where they are
  useEffect(() => {
    if (tutorialMessages[messageIndex].id !== undefined) {
      const element = $(`#${tutorialMessages[messageIndex].id}`);
      if (element && showTutorial) {
        element.scrollIntoView();
        window.scrollBy(0, -60);
        setPosition(element.getBoundingClientRect());
      }
    } else return;
  }, [messageIndex, showTutorial]);

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
          <div
            // these styles position the message on the page
            style={{
              position: tutorialMessages[messageIndex].id
                ? 'absolute'
                : 'unset',
              top:
                tutorialMessages[messageIndex].classname !== 'tutorial-top'
                  ? position && position?.height + position?.top + 20
                  : // This math below needs to be changed
                    position && position?.top * -0.2,
              left:
                tutorialMessages[messageIndex].classname !== 'tutorial-top'
                  ? tutorialMessages[messageIndex].classname !== 'tutorial-redo'
                    ? position && position.left + 20
                    : position && position.left + 20 - position.left / 2.5
                  : '',
            }}
            className={`${tutorialMessages[messageIndex].classname}`}
          >
            {tutorialMessages[messageIndex].arrow && (
              <div className={`${tutorialMessages[messageIndex].styleclass}`}>
                <img
                  className="arrow"
                  src={tutorialMessages[messageIndex].arrow}
                />
              </div>
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
