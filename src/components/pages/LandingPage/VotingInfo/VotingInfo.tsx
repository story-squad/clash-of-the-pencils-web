import React from 'react';
import { Link } from 'react-router-dom';
// PNG Images
import blazeWillReadPNG from '../../../../assets/img/PNGs/blaze-will-read.png';
import dragonDropDemoPNG from '../../../../assets/img/PNGs/dragon-drop-demo.png';
import dragonSinglePNG from '../../../../assets/img/PNGs/dragon-single-page.png';
// WebP Images
import blazeWillReadWEBP from '../../../../assets/img/WebPs/blaze-will-read.webp';
import dragonDropDemoWEBP from '../../../../assets/img/WebPs/dragon-drop-demo.webp';
import dragonSingleWEBP from '../../../../assets/img/WebPs/dragon-single-page.webp';
// Components
import { Image } from '../../../common';

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
        <Image
          webp={blazeWillReadWEBP}
          src={blazeWillReadPNG}
          alt="4. Vote on the three finalists to determine a winner and see your squad score."
        />
        <Image
          webp={dragonDropDemoWEBP}
          src={dragonDropDemoPNG}
          alt="Dragon Drop. Vote by dragging the drag-n-drop dragons onto your favorite story below, then click the button."
        />
        <div className="button-container">
          <div className="link-button">
            <Link to="/game">Get Started</Link>
          </div>
        </div>
        <div className="dragon">
          <Image
            webp={dragonSingleWEBP}
            src={dragonSinglePNG}
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
