import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { PROMPT_BOX_ID } from '../../../config/tutorialSelectionIds';
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
  // const [position, setPosition] = useState<DOMRect>();
  const router = useHistory();
  const [{ message, arrow, classname, id, styleclass }] = useMemo(
    () => [tutorialMessages[messageIndex]],
    [tutorialMessages, messageIndex],
  );
  // can try and add another component and move all logic to it and render based on loading there
  const nextItem = () => {
    console.log(styleclass);
    setMessage((prev) => {
      if (prev < tutorialMessages.length - 1 && styleclass !== 'special') {
        return prev + 1;
      } else {
        setShowTutorial(false);
        setModalIsOpen(false);
        router.push('/schedule');
        return prev;
      }
    });
  };

  const prevItem = () => {
    setMessage((prev) => {
      if (prev < tutorialMessages.length) {
        return prev - 1;
      } else {
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
  const [position] = useMemo(() => {
    if (id !== undefined && showTutorial) {
      const element = $(`#${id}`);
      if (element) {
        if (element.id !== 'top-three-id') {
          element.scrollIntoView({ block: 'center' });
        } else {
          element.scrollIntoView({ block: 'end' });
        }
        return [element.getBoundingClientRect()];
      }
    }
    return [];
  }, [id, showTutorial]);

  const [center] = useMemo(() => {
    if (id !== undefined && showTutorial) {
      const promptBox = $(`#${PROMPT_BOX_ID}`);
      return [promptBox?.getBoundingClientRect()];
    }
    return [];
  }, [PROMPT_BOX_ID, showTutorial]);
  const centerI = center && (center.left + center.right) / 2;
  console.log(centerI);

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
            style={
              classname !== 'tutorial-top'
                ? {
                    top:
                      id !== 'leaderboard-id'
                        ? position && position?.height + position?.top + 20
                        : position && position?.height / 2,
                    left: centerI && centerI,
                  }
                : {
                    top:
                      id === 'stream-id'
                        ? position && position?.top * -0.6
                        : position && position?.top * -0.28,
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
      )}
    </>
  );
};

export default Tutorial;
