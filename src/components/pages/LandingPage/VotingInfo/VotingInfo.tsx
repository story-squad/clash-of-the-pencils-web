import React from 'react';
import { Link } from 'react-router-dom';
import blazeWillRead from '../../../../assets/img/blaze-will-read.png';
import dragonSingle from '../../../../assets/img/dragon-single-page.png';
import dragonDropDemo from '../../../../assets/img/dragon-drop-demo.png';
import NavArrowButton, { NavDirection } from '../NavArrowButton';

const VotingInfo = (props: VotingInfoProps): React.ReactElement => {
  return (
    <div
      className="voting-info"
      ref={(element) => props.responsiveHeightRefs.current.push(element)}
      style={{ height: window.innerHeight }}
    >
      <div className="flex-wrapper">
        <NavArrowButton buttonNav={props.buttonNav} navDirection="up" />
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
        <div className="dragon-boi right">
          <img
            src={dragonSingle}
            className="dragon"
            alt="dragon saying 'A single handwritten page? Sounds easy enough!'"
          />
        </div>
      </div>
    </div>
  );
};

interface VotingInfoProps {
  buttonNav: (navDirection: NavDirection) => void;
  responsiveHeightRefs: React.RefObject<any>;
}

export default VotingInfo;
