import React from 'react';
import { StepProps } from './RenderSteps';
import dragonReady from '../../../../assets/img/dragon-ready.png';
import dummyPrompt from '../../../../assets/img/dummy-prompt.png';
import scopeOut from '../../../../assets/img/scope-out-prompt.png';
import NavArrowButton from '../NavArrowButton';

const Step1 = (props: StepProps): React.ReactElement => {
  return (
    <div
      className="step-1"
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
          <img src={scopeOut} alt="Scope out the prompt." />
        </div>
        <div className="container">
          <img
            src={dummyPrompt}
            alt="Prompt: you're a super hero, and there is a town that needs saving."
          />
          <NavArrowButton navDirection={'right'} buttonNav={props.buttonNavX} />
        </div>
        <div className="container">
          <img
            className="dragon"
            src={dragonReady}
            alt="dragon saying 'Ready?'"
          />
          {props.circles()}
        </div>
        <NavArrowButton navDirection={'down'} buttonNav={props.buttonNavY} />
      </div>
    </div>
  );
};

export default Step1;
