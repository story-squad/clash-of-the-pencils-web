import React from 'react';
import writingStory from '../../../../assets/img/handwriting.gif';
//PNG Images
import dragonGoPNG from '../../../../assets/img/PNGs/dragon-go.png';
import scribbleDownPNG from '../../../../assets/img/PNGs/scribble-down.png';
// WebP Images
import dragonGoWEBP from '../../../../assets/img/WebPs/dragon-go.webp';
import scribbleDownWEBP from '../../../../assets/img/WebPs/scribble-down.webp';
// Components
import { Image } from '../../../common';
import NavArrowButton from '../NavArrowButton';
import { StepProps } from './RenderSteps';

const Step3 = (props: StepProps): React.ReactElement => {
  return (
    <div
      className="step-3"
      ref={(element) =>
        (props.responsiveHeightRefs.current as Set<HTMLDivElement>).add(
          element as HTMLDivElement,
        )
      }
      style={{ height: window.innerHeight }}
    >
      <div className="grid-wrapper">
        <div className="container top">
          <Image
            webp={scribbleDownWEBP}
            src={scribbleDownPNG}
            alt="Scribble down a 1-page story by hand."
          />
        </div>
        <div className="container middle">
          <NavArrowButton navDirection={'left'} buttonNav={props.buttonNavX} />
          <img src={writingStory} alt="Hand with pencil writing a story." />
          <NavArrowButton navDirection={'right'} buttonNav={props.buttonNavX} />
        </div>
        <div className="container bottom">
          <Image
            webp={dragonGoWEBP}
            src={dragonGoPNG}
            classes="dragon"
            alt="dragon saying 'Go!'"
          />
          {props.circles()}
        </div>
      </div>
    </div>
  );
};

export default Step3;
