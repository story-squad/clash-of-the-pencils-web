import React from 'react';
import { Link } from 'react-router-dom';
import voteFinalists from '../../../../assets/img/vote-on-finalists.png';
import dragonDropDemo from '../../../../assets/img/dragon-drop-demo.png';

const VotingInfo = (): React.ReactElement => {
  return (
    <div className="voting-info">
      <img
        className="img-center"
        src={voteFinalists}
        alt="4. Vote on the three finalists to determine a winner and see your squad score."
      />
      <img
        className="img-center"
        src={dragonDropDemo}
        alt="Dragon Drop. Vote by dragging the dra-n-drop dragons onto your favorite story below, then click the button."
      />
      <div className="button-container">
        <div className="link-button">
          <Link to="/game">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default VotingInfo;
