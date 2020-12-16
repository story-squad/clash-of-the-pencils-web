import React from 'react';
import { NavDirection } from './StepsContainer';
import { StepProps } from './RenderSteps';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import submitPic from '../../../../assets/img/submit-a-pic.png';
import writingArrowSubmit from '../../../../assets/img/writing-arrow-submit.png';
import NavArrowButton from './NavArrowButton';

const Step4 = (props: StepProps): React.ReactElement => {
  return (
    <div className="step-4">
      <h2>Step 4</h2>
      <img
        className="img-center"
        src={submitPic}
        alt="3. Submit a pic of your story by the deadline"
      />
      <img
        className="img-center"
        src={writingArrowSubmit}
        alt="Arrow pointing from hand-written story to a button with text: Submit Your Story"
      />
      <div className="dragon-boi">
        <DragonBoi className="dragon" />
      </div>
      <NavArrowButton navDirection={'left'} buttonNav={props.buttonNav} />
    </div>
  );
};

export default Step4;
