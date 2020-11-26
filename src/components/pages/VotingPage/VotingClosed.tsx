import React from 'react';

import { useRecoilValue } from 'recoil';
import { user } from '../../../state';

import { Countdown, Header } from '../../common';
import { nav } from '../../../config';
import { time } from '../../../utils';

const VotingClosed = (): React.ReactElement => {
  const userId = useRecoilValue(user.userId);

  return (
    <div>
      <Header menuItems={userId ? nav.siteNavItems : nav.landingNavItems} />
      <div className="voting-page">
        <div className="countdown-display">
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
