import React from 'react';
import { StepProps } from './RenderSteps';
import dragonGo from '../../../../assets/img/dragon-go.png';
import scribbleDown from '../../../../assets/img/scribble-down.png';
import writingStory from '../../../../assets/img/writing-story.png';
import NavArrowButton from '../NavArrowButton';

const Step3 = (props: StepProps): React.ReactElement => {
  return (
    <div
      className="step-3"
      ref={(element) => props.responsiveHeightRefs.current.push(element)}
      style={{ height: window.innerHeight }}
    >
      <div className="grid-wrapper" style={{ height: window.innerHeight }}>
        <NavArrowButton navDirection={'up'} buttonNav={props.buttonNavY} />
        <div className="container">
          <img src={scribbleDown} alt="Scribble down a 1-page story by hand." />
        </div>
        <div className="container">
          <NavArrowButton navDirection={'left'} buttonNav={props.buttonNavX} />
          <img src={writingStory} alt="Hand with pencil writing a story." />
          <NavArrowButton navDirection={'right'} buttonNav={props.buttonNavX} />
        </div>
        <div className="container">
          <img src={dragonGo} className="dragon" alt="dragon saying 'Go!'" />
          {props.circles()}
        </div>
        <NavArrowButton navDirection={'down'} buttonNav={props.buttonNavY} />
      </div>
    </div>
  );
};

export default Step3;
