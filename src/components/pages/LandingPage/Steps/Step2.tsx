import React from 'react';
import pencilPaper from '../../../../assets/img/paperandpencil.gif';
import dragonSet from '../../../../assets/img/PNGs/dragon-set.png';
import getPaper from '../../../../assets/img/PNGs/get-paper.png';
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
          <img
            src={getPaper}
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
          <img src={dragonSet} className="dragon" alt="dragon saying 'Set?'" />
          {props.circles()}
        </div>
      </div>
    </div>
  );
};

export default Step2;
