import { classnames, useKey } from '@story-squad/react-utils';
import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { PROMPT_BOX_ID } from '../../../config/tutorialSelectionIds';
import { useConfirmationModal, useOpenDashboard } from '../../../hooks';
import { tutorial } from '../../../state';
import { $ } from '../../../utils';
import { Button } from '../../atoms/Button';
import './styles/index.scss';

export interface TutorialProps {
  noTutorial: () => void;
  runTutorial: () => void;
}

const Tutorial = (): React.ReactElement => {
  const [currentMessage, setCurrentmessage] = useRecoilState(
    tutorial.currentMessageIndex,
  );
  // This checks if the tutorial is running
  const [tutorialIsOpen, setTutorialIsOpen] = useRecoilState(tutorial.isOpen);
  // This checks if to run tutorial on app launch
  const [showTutorial, setShowTutorial] = useRecoilState(tutorial.showTutorial);

  const navigate = useNavigate();
  const [{ message, arrow, classname, id, styleclass }] = useMemo(
    () => [tutorial.messages[currentMessage]],
    [tutorial.messages, currentMessage],
  );

  const openDashboard = useOpenDashboard();

  const [modal, openModal] = useConfirmationModal({
    title: 'Hi Scribble Agent, welcome to Clash of the Pencils!',
    message:
      ' Let’s get you started by going through your dashboard. Do you want to run the tutorial?',
    onConfirm: () => {
      openDashboard();
      setTutorialIsOpen(true);
    },
    confirmText: 'Yes, Start',
    cancelText: 'No, Thanks',
    onCancel: () => {
      setShowTutorial(false);
    },
  });

  useEffect(openModal, []);

  const stopTutorial = () => {
    setTutorialIsOpen(false);
  };
  useKey({
    action: stopTutorial,
    key: 'Escape',
  });

  const nextItem = () => {
    if (
      currentMessage < tutorial.messages.length - 1 &&
      styleclass !== 'special'
    ) {
      setCurrentmessage(currentMessage + 1);
    } else {
      setTutorialIsOpen(false);
      setShowTutorial(false);
      navigate('/schedule');
    }
  };

  const tutorialRef = useRef<HTMLDivElement>(null);
  const tutorialHeight = useMemo(() => {
    const { height } = tutorialRef.current?.getBoundingClientRect() ?? {};
    return height ?? 0;
  }, [tutorialRef.current]);

  // Finds and gets the IDS that are on the page linked to the tutorial and positions the page based on where they are
  const [position] = useMemo(() => {
    if (id !== undefined && tutorialIsOpen) {
      const element = $(`#${id}`);
      if (element) {
        element.scrollIntoView({ block: 'end', behavior: 'smooth' });
        const { height, top } = element.getBoundingClientRect();
        return [{ height: height, top: top + window.scrollY }];
      }
    }
    return [];
  }, [id, tutorialIsOpen]);

  //Gets the maths stuffs to center the message properly accross screens
  const [center] = useMemo(() => {
    if (id !== undefined && tutorialIsOpen) {
      const promptBox = $(`#${PROMPT_BOX_ID}`);
      const bounds = promptBox?.getBoundingClientRect();
      return [bounds && (bounds.left + bounds.right) / 2];
    }
    return [];
  }, [PROMPT_BOX_ID, tutorialIsOpen]);

  return (
    <>
      {tutorialIsOpen && (
        <div
          className="tutorial-screen"
          onClick={(e) => {
            e.stopPropagation();
            stopTutorial();
          }}
        />
      )}
      {showTutorial && modal}
      {tutorialIsOpen && (
        <div className="tutorial-container">
          <div className="tutorial-wrapper">
            <div
              ref={tutorialRef}
              // these styles position the message on the page
              style={
                classname !== 'tutorial-top'
                  ? {
                      position: 'absolute',
                      top:
                        id !== 'leaderboard-id'
                          ? position && position?.height + position?.top + 20
                          : position && position?.height / 2,
                      left: id !== 'leaderboard-id' ? center && center : '',
                    }
                  : {
                      position: 'absolute',
                      top: position && position?.top - tutorialHeight - 100,
                    }
              }
              className={classnames(classname)}
            >
              {arrow && (
                <div className={`${styleclass}`}>
                  <img className="arrow" src={arrow} />
                </div>
              )}
              <div className="dashboard-tutorial-content">
                <p>{message}</p>
                <div>
                  <Button onClick={nextItem}>Next</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tutorial;
