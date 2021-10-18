import React, { useEffect, useState } from 'react';
import { Button } from '..';
import { DragonLoader } from '../../molecules';
import './styles/index.scss';
import TutorialModal from './TutorialModal';

export interface TutorialProps {
  noTutorial: () => void;
  runTutorial: () => void;
}

const Tutorial = (): React.ReactElement => {
  const [messageItem, setMessage] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const tutorialMessages: { message: string; key: number }[] = [
    {
      key: 0,
      message: 'Each day a new prompt will be displayed on the dashboard.',
    },
    {
      key: 1,
      message: 'If you need a little help getting started, click here!',
    },
    {
      key: 2,
      message: 'When you’re done writing, submit a story to earn points.',
    },
    {
      key: 3,
      message:
        'The countdown timer will tell you how much time is left in each stage of the game.',
    },
    {
      key: 4,
      message:
        'Each story is analyzed by a super high tech data science engine that awards points based on story development, reader engagement, and creativity.',
    },
    {
      key: 5,
      message:
        'Every day, the top 3 stories voted on to determine the daily winner. The player with the most points at the end of the week is crowned the champion!',
    },
    {
      key: 6,
      message:
        'Results are announced via livestream every Monday through Friday at 8pm EST / 5pm PST where we break down the highlights, analyze the winning stories, and offer some secret tips for how to score higher.',
    },
    {
      key: 7,
      message:
        'Check the leaderboard each day to see where you rank amoung other players!',
    },
  ];

  const CheckLocalStorage = () => {
    setLoading(false);
    if (localStorage.getItem('tutorial-Key')) {
      setShowTutorial(false);
      setModalIsOpen(false);
      setLoading(false);
    } else return;
  };

  useEffect(() => {
    CheckLocalStorage();
  }, []);

  const nextItem = () => {
    if (tutorialMessages[messageItem].key !== 7) {
      setMessage((prev) => (prev + 1) % tutorialMessages.length);
    } else {
      localStorage.setItem('tutorial-Key', 'turkey');
      setShowTutorial(false);
      setLoading(false);
    }
  };

  const NoTutorial = () => {
    localStorage.setItem('tutorial-Key', 'turkey');
    setShowTutorial(false);
    setModalIsOpen(false);
  };

  const RunTutorial = () => {
    setShowTutorial(true);
    setModalIsOpen(false);
  };
  console.log(modalIsOpen);
  return (
    <>
      {loading ? (
        <div className="tutorial-wrapper">
          <div className="tutorial-loader">
            <DragonLoader />
          </div>
        </div>
      ) : (
        <>
          {modalIsOpen ? (
            <TutorialModal
              setIsOpen={setModalIsOpen}
              isOpen={modalIsOpen}
              noTutorial={NoTutorial}
              runTutorial={RunTutorial}
            />
          ) : (
            showTutorial && (
              <div className="tutorial-wrapper">
                <div>
                  <div className="dashboard-tutorial-content">
                    <p>{tutorialMessages[messageItem].message}</p>
                    <div>
                      <Button onClick={() => nextItem()}>Next</Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default Tutorial;
