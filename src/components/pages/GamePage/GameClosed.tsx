import React from 'react';
import { time } from '../../../utils';
import { Countdown, Header } from '../../common';

const GameClosed = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="closed-page">
        <div className="countdown-closed-component">
          <h2>Submissions are currently closed!</h2>
          <p>
            Sorry you missed it :(
            <br />
            Voting begins at{' '}
            <span className="alt">
              {time.schedule.vote.start.format('h:mm A')}
            </span>
          </p>
          <p>
            Check back in: <Countdown toEvent="vote" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameClosed;
