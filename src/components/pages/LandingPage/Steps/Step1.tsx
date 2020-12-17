import React from 'react';
import { StepProps } from './RenderSteps';
import dragonReady from '../../../../assets/img/dragon-ready.png';
import dummyPrompt from '../../../../assets/img/dummy-prompt.png';
import scopeOut from '../../../../assets/img/scope-out-prompt.png';
import NavArrowButton from '../NavArrowButton';

const Step1 = (props: StepProps): React.ReactElement => {
  return (
    <div className="step-1">
      <div className="flex-wrapper">
        <img src={scopeOut} alt="Scope out the prompt." />
        <img
          src={dummyPrompt}
          alt="Prompt: you're a super hero, and there is a town that needs saving."
        />
        <div className="dragon-boi">
          <img
            src={dragonReady}
            className="dragon"
            alt="dragon saying 'Ready?'"
          />
        </div>
      </div>
      <NavArrowButton navDirection={'right'} buttonNav={props.buttonNav} />
    </div>
  );
};

export default Step1;
