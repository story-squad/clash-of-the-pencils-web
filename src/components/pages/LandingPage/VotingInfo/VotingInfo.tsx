import React from 'react';
import { Link } from 'react-router-dom';
import blazeWillRead from '../../../../assets/img/PNGs/blaze-will-read.png';
import dragonDropDemo from '../../../../assets/img/PNGs/dragon-drop-demo.png';
import dragonSingle from '../../../../assets/img/PNGs/dragon-single-page.png';

const VotingInfo = (props: VotingInfoProps): React.ReactElement => {
  return (
    <div
      className="voting-info"
      ref={(element) =>
        (props.responsiveHeightRefs.current as Set<HTMLDivElement>).add(
          element as HTMLDivElement,
        )
      }
      style={{ height: window.innerHeight }}
    >
      <div
        className="flex-wrapper"
        ref={(element) =>
          (props.responsiveHeightRefs.current as Set<HTMLDivElement>).add(
            element as HTMLDivElement,
          )
        }
      >
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

interface VotingInfoProps {
  responsiveHeightRefs: React.RefObject<Set<HTMLDivElement>>;
}

export default VotingInfo;
