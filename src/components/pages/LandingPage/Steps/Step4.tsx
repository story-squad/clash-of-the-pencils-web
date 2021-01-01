import React from 'react';
// PNG Images
import dragonFirePNG from '../../../../assets/img/PNGs/dragon-fire.png';
import submitPicPNG from '../../../../assets/img/PNGs/submit-a-pic.png';
import writingArrowSubmitPNG from '../../../../assets/img/PNGs/writing-arrow-submit.png';
//WebP Images
import dragonFireWEBP from '../../../../assets/img/WebPs/dragon-fire.webp';
import submitPicWEBP from '../../../../assets/img/WebPs/submit-a-pic.webp';
import writingArrowSubmitWEBP from '../../../../assets/img/WebPs/writing-arrow-submit.webp';
//Components
import { Image } from '../../../common';
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
          <Image
            webp={submitPicWEBP}
            src={submitPicPNG}
            alt="Submit a pic of your story by the deadline"
          />
        </div>
        <div className="container middle">
          <NavArrowButton navDirection={'left'} buttonNav={props.buttonNavX} />
          <Image
            webp={writingArrowSubmitWEBP}
            src={writingArrowSubmitPNG}
            alt="Arrow pointing from hand-written story to a button with text: Submit Your Story"
          />
        </div>
        <div className="container bottom">
          <Image
            webp={dragonFireWEBP}
            src={dragonFirePNG}
            classes="dragon"
            alt="dragon saying 'Go!'"
          />
          {props.circles()}
        </div>
      </div>
    </div>
  );
};

export default Step4;
