import React from 'react';
import dragonReady from '../../../../assets/img/dragon-ready.png';
import dummyPrompt from '../../../../assets/img/dummy-prompt.png';
import scopeOut from '../../../../assets/img/scope-out-prompt.png';
import { time } from '../../../../utils';
import { PromptBox } from '../../../common';
import NavArrowButton from '../NavArrowButton';
import { StepProps } from './RenderSteps';

const Step1 = (props: StepProps): React.ReactElement => {
  const { active } = time.getTimeUntilEvent('submit');
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
          {active ? (
            <PromptBox hideSubmitButton showHeader />
          ) : (
            <img
              src={dummyPrompt}
              alt="Prompt: you're a super hero, and there is a town that needs saving."
            />
          )}
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
