import React from 'react';
import { NavDirection } from './StepsContainer';
import { StepProps } from './RenderSteps';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import dummyPrompt from '../../../../assets/img/dummy-prompt.png';
import scopeOut from '../../../../assets/img/scope-out-prompt.png';

const Step1 = (props: StepProps): React.ReactElement => {
  return (
    <div className="step-1">
      <h2>Step 1</h2>
      <img
        className="img-center"
        src={scopeOut}
        alt="1. Scope out the prompt."
      />
      <img
        className="img-center"
        src={dummyPrompt}
        alt="Prompt: you're a super hero, and there is a town that needs saving."
      />
      <div className="dragon-boi">
        <DragonBoi className="dragon" />
      </div>
    </div>
  );
};

export default Step1;
