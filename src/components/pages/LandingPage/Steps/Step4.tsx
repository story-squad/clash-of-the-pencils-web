import React from 'react';
import dragonFire from '../../../../assets/img/PNGs/dragon-fire.png';
import submitPic from '../../../../assets/img/PNGs/submit-a-pic.png';
import writingArrowSubmit from '../../../../assets/img/PNGs/writing-arrow-submit.png';
import NavArrowButton from '../NavArrowButton';
import { StepProps } from './RenderSteps';

const Step4 = (props: StepProps): React.ReactElement => {
  return (
    <div
      className="step-4"
      ref={(element) =>
        (props.responsiveHeightRefs.current as Set<HTMLDivElement>).add(
          element as HTMLDivElement,
        )
      }
      style={{ height: window.innerHeight }}
    >
      <div className="grid-wrapper">
        <div className="container top">
          <img
            src={submitPic}
            alt="Submit a pic of your story by the deadline"
          />
        </div>
        <div className="container middle">
          <NavArrowButton navDirection={'left'} buttonNav={props.buttonNavX} />
          <img
            src={writingArrowSubmit}
            alt="Arrow pointing from hand-written story to a button with text: Submit Your Story"
          />
        </div>
        <div className="container bottom">
          <img src={dragonFire} className="dragon" alt="dragon saying 'Go!'" />
          {props.circles()}
        </div>
      </div>
    </div>
  );
};

export default Step4;
