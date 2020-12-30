import React from 'react';
import { Link } from 'react-router-dom';
import blazeWillRead from '../../../../assets/img/blaze-will-read.png';
import dragonDropDemo from '../../../../assets/img/dragon-drop-demo.png';
import dragonSingle from '../../../../assets/img/dragon-single-page.png';

const VotingInfo = (): React.ReactElement => {
  return (
    <div className="voting-info">
      <div className="flex-wrapper">
        <img
          src={blazeWillRead}
          alt="4. Vote on the three finalists to determine a winner and see your squad score."
        />
        <img
          src={dragonDropDemo}
          alt="Dragon Drop. Vote by dragging the drag-n-drop dragons onto your favorite story below, then click the button."
        />
        <div className="button-container">
          <div className="link-button">
            <Link to="/game">Get Started</Link>
          </div>
        </div>
        <div className="dragon">
          <img
            src={dragonSingle}
            alt="dragon saying 'A single handwritten page? Sounds easy enough!'"
          />
        </div>
      </div>
    </div>
  );
};

export default VotingInfo;
