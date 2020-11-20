import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { top3, user } from '../../../../state';

import { Header } from '../../../common';
import { nav } from '../../../../config';
import ReadTop3 from './ReadTop3';

const RenderReadSubmissions = (): React.ReactElement => {
  const readCount = useRecoilValue(top3.getReadCount);
  const setFinishedReading = useSetRecoilState(top3.hasFinishedReadingState);

  // grab the user id from recoil to ensure we are logged in
  const userId = useRecoilValue(user.userId);

  return (
    <div>
      <Header menuItems={userId ? nav.siteNavItems : nav.landingNavItems} />
      <div className="voting-page">
        <div className="top-text">
          <h2>Welcome to the Voting Station!</h2>
          <p>Voting is simple!</p>
          <p className="instructions">
            <span className="alt">First</span>, click on each of the stories to
            read them. <span className="alt">Then</span>, click the orange
            button to begin voting.
          </p>
        </div>
        <ReadTop3 />
        <div className="button-container">
          <button
            disabled={readCount < 3}
            onClick={() => setFinishedReading(true)}
          >
            Start Voting
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderReadSubmissions;
