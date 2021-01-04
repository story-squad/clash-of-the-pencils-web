import React from 'react';
import { time } from '../../../utils';
import { Countdown, Header } from '../../common';

const GameClosed = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="closed-page">
        <div className="countdown-closed-component">
          <h2>Game is paused</h2>
          <p>
            Blaze is currently reading your stories! We&apos;ll return for
            voting as soon as he&apos;s finished!
          </p>
          <p className="begins">
            Voting begins at{' '}
            <span className="alt">
              {time.schedule.vote.start.format('h:mm A')}
            </span>
          </p>
          <p className="check-back">
            Check back in: <Countdown toEvent="vote" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameClosed;
