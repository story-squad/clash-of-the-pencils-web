import React, { useEffect, useState } from 'react';
import { Button } from '..';
import './styles/index.scss';

const Tutorial = (): React.ReactElement => {
  const [messageItem, setMessage] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

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
    if (localStorage.getItem('this is tutorial key')) {
      setShowTutorial(false);
    } else return;
  };

  useEffect(() => {
    CheckLocalStorage();
  }, []);

  const nextItem = () => {
    if (tutorialMessages[messageItem].key !== 7) {
      setMessage((prev) => (prev + 1) % tutorialMessages.length);
    } else {
      localStorage.setItem('this is tutorial key', 'turkey');
      setShowTutorial(false);
    }
  };

  return (
    <>
      {showTutorial && (
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
      )}
    </>
  );
};

export default Tutorial;
