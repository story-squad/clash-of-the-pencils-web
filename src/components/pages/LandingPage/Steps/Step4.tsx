import React from 'react';
import { StepProps } from './RenderSteps';
import dragonFire from '../../../../assets/img/dragon-fire.png';
import submitPic from '../../../../assets/img/submit-a-pic.png';
import writingArrowSubmit from '../../../../assets/img/writing-arrow-submit.png';
import NavArrowButton from '../NavArrowButton';

const Step4 = (props: StepProps): React.ReactElement => {
  return (
    <div
      className="step-4"
      ref={(element) => props.responsiveHeightRefs.current.push(element)}
      style={{ height: window.innerHeight }}
    >
      <div
        className="grid-wrapper"
        ref={(element) => props.responsiveHeightRefs.current.push(element)}
        style={{ height: window.innerHeight }}
      >
        <NavArrowButton navDirection={'up'} buttonNav={props.buttonNavY} />
        <div className="container">
          <img
            src={submitPic}
            alt="Submit a pic of your story by the deadline"
          />
        </div>
        <div className="container">
          <NavArrowButton navDirection={'left'} buttonNav={props.buttonNavX} />
          <img
            src={writingArrowSubmit}
            alt="Arrow pointing from hand-written story to a button with text: Submit Your Story"
          />
        </div>
        <div className="container">
          <img src={dragonFire} className="dragon" alt="dragon saying 'Go!'" />
          {props.circles()}
        </div>
        <NavArrowButton navDirection={'down'} buttonNav={props.buttonNavY} />
      </div>
    </div>
  );
};

export default Step4;
