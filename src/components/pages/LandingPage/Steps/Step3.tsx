import React from 'react';
import dragonGo from '../../../../assets/img/dragon-go.png';
import scribbleDown from '../../../../assets/img/scribble-down.png';
import writingStory from '../../../../assets/img/handwriting.gif';
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
          <img src={scribbleDown} alt="Scribble down a 1-page story by hand." />
        </div>
        <div className="container middle">
          <NavArrowButton navDirection={'left'} buttonNav={props.buttonNavX} />
          <img src={writingStory} alt="Hand with pencil writing a story." />
          <NavArrowButton navDirection={'right'} buttonNav={props.buttonNavX} />
        </div>
        <div className="container bottom">
          <div
            className="dragon"
            style={{ backgroundImage: `url(${dragonGo})` }}
            aria-role="img"
            aria-label="dragon saying 'Go!'"
          />
          {props.circles()}
        </div>
      </div>
    </div>
  );
};

export default Step3;
