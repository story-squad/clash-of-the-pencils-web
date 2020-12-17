import React from 'react';
import { Link } from 'react-router-dom';
import voteFinalists from '../../../../assets/img/vote-on-finalists.png';
import dragonDropDemo from '../../../../assets/img/dragon-drop-demo.png';
import NavArrowButton, { NavDirection } from '../NavArrowButton';

const VotingInfo = (props: VotingInfoProps): React.ReactElement => {
  return (
    <div className="voting-info">
      <img
        className="img-center"
        src={voteFinalists}
        alt="4. Vote on the three finalists to determine a winner and see your squad score."
      />
      <NavArrowButton buttonNav={props.buttonNav} navDirection="up" />
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

interface VotingInfoProps {
  buttonNav: (navDirection: NavDirection) => void;
}

export default VotingInfo;
