import React from 'react';
import { time } from '../../../utils';
import { Countdown, Header } from '../../common';

const ResultsClosed = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="voting-page">
        <div className="countdown-display">
          <h2>Results is currently closed!</h2>
          <p>
            Sorry you missed it :(
            <br />
            Results will be displayed every day at{' '}
            <span className="alt">
              {time.schedule.announce.start.format('h:mm A')}
            </span>
          </p>
          <p>
            Check back in <Countdown toEvent="announce" /> to see today&apos;s{' '}
            winner!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsClosed;
