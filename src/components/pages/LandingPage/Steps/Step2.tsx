import React from 'react';
import dragonSet from '../../../../assets/img/dragon-set.png';
import getPaper from '../../../../assets/img/get-paper.png';
import pencilPaper from '../../../../assets/img/pencil-and-paper.png';
import NavArrowButton from '../NavArrowButton';
import { StepProps } from './RenderSteps';

const Step2 = (props: StepProps): React.ReactElement => {
  return (
    <div
      className="step-2"
      ref={(element) => props.responsiveHeightRefs.current.add(element)}
      style={{ height: window.innerHeight }}
    >
      <div
        className="grid-wrapper"
        ref={(element) => props.responsiveHeightRefs.current.add(element)}
        style={{ height: window.innerHeight }}
      >
        <NavArrowButton navDirection={'up'} buttonNav={props.buttonNavY} />
        <div className="container">
          <img
            src={getPaper}
            alt="Get a piece of paper and your lucky pencil."
          />
        </div>
        <div className="container">
          <NavArrowButton navDirection={'left'} buttonNav={props.buttonNavX} />
          <img
            className="img-center"
            src={pencilPaper}
            alt="Paper and pencil."
          />
          <NavArrowButton navDirection={'right'} buttonNav={props.buttonNavX} />
        </div>
        <div className="container">
          <img src={dragonSet} className="dragon" alt="dragon saying 'Set?'" />
          {props.circles()}
        </div>
        <NavArrowButton navDirection={'down'} buttonNav={props.buttonNavY} />
      </div>
    </div>
  );
};

export default Step2;
