import React, { useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { PROMPT_BOX_ID } from '../../../config/tutorialSelectionIds';
import { useConfirmationModal } from '../../../hooks';
import { app } from '../../../state';
import { $ } from '../../../utils';
import { Button } from '../../atoms/Button';
import './styles/index.scss';
import { tutorialMessages } from './tutorialMessages';

export interface TutorialProps {
  noTutorial: () => void;
  runTutorial: () => void;
}

const Tutorial = (): React.ReactElement => {
  const [currentMessage, setCurrentmessage] = useRecoilState(
    app.tutorial.currentMessageIndex,
  );
  // This is whether the tutorial is running
  const [tutorialIsOpen, setTutorialIsOpen] = useRecoilState(
    app.tutorial.isOpen,
  );
  // This is whether to run tutorial on app launch
  const [showTutorial, setShowTutorial] = useRecoilState(
    app.tutorial.showTutorial,
  );

  const router = useHistory();
  const [{ message, arrow, classname, id, styleclass }] = useMemo(
    () => [tutorialMessages[currentMessage]],
    [tutorialMessages, currentMessage],
  );

  const [modal, openModal] = useConfirmationModal({
    title: 'Hi Scribble Agent, welcome to Clash of the Pencils!',
    message:
      'Let’s get you started by going through your dashboard. Do you want to run the tutorial?',
    onConfirm: () => {
      setTutorialIsOpen(true);
    },
    confirmText: 'Yes, Start',
    cancelText: 'No, Thanks',
    onCancel: () => {
      setShowTutorial(false);
    },
  });

  useEffect(openModal, []);

  const nextItem = () => {
    if (
      currentMessage < tutorialMessages.length - 1 &&
      styleclass !== 'special'
    ) {
      setCurrentmessage(currentMessage + 1);
    } else {
      setTutorialIsOpen(false);
      //This is little confusing but wont work other way maybe wording can be changed but brain is tired
      setShowTutorial(false);
      router.push('/schedule');
    }
  };
  // console.log(currentMessage);
  // const prevItem = () => {
  //   setCurrentmessage((prev) => {
  //     if (prev < tutorialMessages.length) {
  //       return prev - 1;
  //     } else {
  //       return prev;
  //     }
  //   });
  // };

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

  // REMEMBER LOOK FOR THE CHICKENNUGGET
  return (
    <>
      {tutorialIsOpen && <div className="tutorial-screen" />}
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
              className={`${classname}`}
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
                  {/* <Button onClick={prevItem}>Prev</Button> */}
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
