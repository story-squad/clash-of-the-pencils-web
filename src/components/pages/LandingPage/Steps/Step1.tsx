import React from 'react';
import dragonReady from '../../../../assets/img/PNGs/dragon-ready.png';
import dummyPrompt from '../../../../assets/img/PNGs/dummy-prompt.png';
import scopeOut from '../../../../assets/img/PNGs/scope-out-prompt.png';
import NavArrowButton from '../NavArrowButton';
import { StepProps } from './RenderSteps';

const Step1 = (props: StepProps): React.ReactElement => {
  return (
    <div
      className="step-1"
      ref={(element) =>
        (props.responsiveHeightRefs.current as Set<HTMLDivElement>).add(
          element as HTMLDivElement,
        )
      }
      style={{ height: window.innerHeight }}
    >
      <div className="grid-wrapper">
        <div className="container top">
          <img src={scopeOut} alt="Scope out the prompt." />
        </div>
        <div className="container middle">
          <img
            src={dummyPrompt}
            alt="Prompt: you're a super hero, and there is a town that needs saving."
          />
          <NavArrowButton navDirection={'right'} buttonNav={props.buttonNavX} />
        </div>
        <div className="container bottom">
          <img
            className="dragon"
            src={dragonReady}
            alt="dragon saying 'Ready?'"
          />
          {props.circles()}
        </div>
      </div>
    </div>
  );
};

export default Step1;
