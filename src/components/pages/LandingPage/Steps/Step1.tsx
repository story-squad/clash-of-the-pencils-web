import React from 'react';
import { StepProps } from './RenderSteps';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import dummyPrompt from '../../../../assets/img/dummy-prompt.png';
import scopeOut from '../../../../assets/img/scope-out-prompt.png';
import NavArrowButton from '../NavArrowButton';

const Step1 = (props: StepProps): React.ReactElement => {
  return (
    <div className="step-1">
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
      <NavArrowButton navDirection={'right'} buttonNav={props.buttonNav} />
    </div>
  );
};

export default Step1;
