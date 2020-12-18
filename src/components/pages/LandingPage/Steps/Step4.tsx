import React from 'react';
import { StepProps } from './RenderSteps';
import dragonFire from '../../../../assets/img/dragon-fire.png';
import submitPic from '../../../../assets/img/submit-a-pic.png';
import writingArrowSubmit from '../../../../assets/img/writing-arrow-submit.png';
import NavArrowButton from '../NavArrowButton';

const Step4 = (props: StepProps): React.ReactElement => {
  return (
    <div className="step-4">
      <div className="flex-wrapper">
        <img
          className="img-center"
          src={submitPic}
          alt="Submit a pic of your story by the deadline"
        />
        <img
          className="img-center"
          src={writingArrowSubmit}
          alt="Arrow pointing from hand-written story to a button with text: Submit Your Story"
        />
        <div className="dragon-boi right">
          <img src={dragonFire} className="dragon" alt="dragon saying 'Go!'" />
        </div>
      </div>
      <NavArrowButton navDirection={'left'} buttonNav={props.buttonNav} />
    </div>
  );
};

export default Step4;
