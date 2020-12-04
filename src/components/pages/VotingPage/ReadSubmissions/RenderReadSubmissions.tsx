import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import votingStation from '../../../../assets/img/voting-booth.png';
import { top3 } from '../../../../state';
import { Countdown, Header } from '../../../common';
import ReadTop3 from './ReadTop3';

const RenderReadSubmissions = (): React.ReactElement => {
  const readCount = useRecoilValue(top3.getReadCount);
  const setFinishedReading = useSetRecoilState(top3.hasFinishedReadingState);

  return (
    <div>
      <Header />
      <div className="voting-page">
        <div className="top-text">
          <img src={votingStation} alt="Voting Booth" />
          <p className="instructions">
            <span className="alt">First</span>, click on each of the stories to
            read them. <span className="alt">Then</span>, click the orange
            button to begin voting.
          </p>
        </div>
        <div className="countdown-closed-component">
          <p>
            <Countdown toEvent="vote" /> left to vote!
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
