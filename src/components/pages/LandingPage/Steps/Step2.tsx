import React from 'react';
import pencilPaper from '../../../../assets/img/paperandpencil.gif';
// PNG Images
import dragonSetPNG from '../../../../assets/img/PNGs/dragon-set.png';
import getPaperPNG from '../../../../assets/img/PNGs/get-paper.png';
// WebP Images
import dragonSetWEBP from '../../../../assets/img/WebPs/dragon-set.webp';
import getPaperWEBP from '../../../../assets/img/WebPs/get-paper.webp';
// Components
import { Image } from '../../../common';
import NavArrowButton from '../NavArrowButton';
import { StepProps } from './RenderSteps';

const Step2 = (props: StepProps): React.ReactElement => {
  return (
    <div
      className="step-2"
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
            webp={getPaperWEBP}
            src={getPaperPNG}
            alt="Get a piece of paper and your lucky pencil."
          />
        </div>
        <div className="container middle">
          <NavArrowButton navDirection={'left'} buttonNav={props.buttonNavX} />
          <img
            className="img-center"
            src={pencilPaper}
            alt="Paper and pencil."
          />
          <NavArrowButton navDirection={'right'} buttonNav={props.buttonNavX} />
        </div>
        <div className="container bottom">
          <Image
            webp={dragonSetWEBP}
            src={dragonSetPNG}
            classes="dragon"
            alt="dragon saying 'Set?'"
          />
          {props.circles()}
        </div>
      </div>
    </div>
  );
};

export default Step2;
