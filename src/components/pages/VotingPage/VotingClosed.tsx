import React from 'react';
import { time } from '../../../utils';
import { Countdown, Header } from '../../common';

const VotingClosed = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="results-page">
        <div className="countdown-closed-component">
          <h2>Voting is currently closed!</h2>
          <p>
            Sorry you missed it :(
            <br />
            Voting begins every day at{' '}
            <span className="alt">
              {time.schedule.vote.start.format('h:mm A')}
            </span>
          </p>
          <p>
            Check back in <Countdown toEvent="vote" /> to vote!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VotingClosed;
