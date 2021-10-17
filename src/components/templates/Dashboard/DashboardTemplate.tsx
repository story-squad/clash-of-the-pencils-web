import { classnames, ErrorBoundary } from '@story-squad/react-utils';
import React from 'react';
// { useState }
import { Footer, Header, HeaderSwitcherProps } from '../../organisms';
import DashboardErrorFallback from './DashboardErrorFallback';
import './styles/index.scss';

export default function DashboardTemplate({
  useStorySquadHeader = false,
  children,
  className,
}: React.PropsWithChildren<
  HeaderSwitcherProps & {
    className?: string;
  }
>): React.ReactElement {
  // const [messageKey, setMessageKey] = useState(0);

  // const tutorialMessages: { message: string }[] = [
  //   {
  //     message: 'Each day a new prompt will be displayed on the dashboard.',
  //   },
  //   {
  //     message: 'If you need a little help getting started, click here!',
  //   },
  //   {
  //     message: 'When you’re done writing, submit a story to earn points.',
  //   },
  //   {
  //     message:
  //       'The countdown timer will tell you how much time is left in each stage of the game.',
  //   },
  //   {
  //     message:
  //       'Each story is analyzed by a super high tech data science engine that awards points based on story development, reader engagement, and creativity.',
  //   },
  //   {
  //     message:
  //       'Every day, the top 3 stories voted on to determine the daily winner. The player with the most points at the end of the week is crowned the champion!',
  //   },
  //   {
  //     message:
  //       'Results are announced via livestream every Monday through Friday at 8pm EST / 5pm PST where we break down the highlights, analyze the winning stories, and offer some secret tips for how to score higher.',
  //   },
  //   {
  //     message:
  //       'Check the leaderboard each day to see where you rank amoung other players!',
  //   },
  // ];

  // // const nextItem = (i: number) => {};

  // const nextItem = () => {
  //   setMessageKey((prev) => (prev + 1) % tutorialMessages.length);
  // };
  return (
    <div className={classnames('dashboard-template', className)}>
      {/* <div
        style={{
          visibility: 'hidden',
          zIndex: 2,
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '100%',
          alignItems: 'stretch',
          backgroundColor: '#101011',
          opacity: '0.8',
        }}
      >
        <div
          style={{
            zIndex: 3,
            width: '80%',
            padding: '20px 0px',
            margin: 'auto',
            opacity: 'unset',
            backgroundColor: 'white',
          }}
        >
          <p style={{ fontSize: '18px', textAlign: 'center' }}>
            {tutorialMessages[messageKey].message}
            <button onClick={() => nextItem()}>Next</button>
          </p>
        </div>
      </div> */}
      <Header useStorySquadHeader={useStorySquadHeader} />
      <div id="dashboard-content">
        <div className="dashboard-content-container">
          <ErrorBoundary fallback={DashboardErrorFallback}>
            {children}
          </ErrorBoundary>
        </div>
      </div>
      <Footer />
    </div>
  );
}
