import React from 'react';
// PNG Images
import dragonReadyPNG from '../../../../assets/img/PNGs/dragon-ready.png';
import dummyPromptPNG from '../../../../assets/img/PNGs/dummy-prompt.png';
import scopeOutPNG from '../../../../assets/img/PNGs/scope-out-prompt.png';
//WebP Images
import dragonReadyWEBP from '../../../../assets/img/WebPs/dragon-ready.webp';
import dummyPromptWEBP from '../../../../assets/img/WebPs/dummy-prompt.webp';
import scopeOutWEBP from '../../../../assets/img/WebPs/scope-out-prompt.webp';
// Components
import { Image } from '../../../common';
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
          <Image
            webp={scopeOutWEBP}
            src={scopeOutPNG}
            alt="Scope out the prompt."
          />
        </div>
        <div className="container middle">
          <Image
            webp={dummyPromptWEBP}
            src={dummyPromptPNG}
            alt="Prompt: you're a super hero, and there is a town that needs saving."
          />
          <NavArrowButton navDirection={'right'} buttonNav={props.buttonNavX} />
        </div>
        <div className="container bottom">
          <Image
            webp={dragonReadyWEBP}
            src={dragonReadyPNG}
            classes="dragon"
            alt="dragon saying 'Ready?'"
          />
          {props.circles()}
        </div>
      </div>
    </div>
  );
};

export default Step1;
