import React from 'react';
import { StepProps } from './RenderSteps';
import dragonSet from '../../../../assets/img/dragon-set.png';
import getPaper from '../../../../assets/img/get-paper.png';
import pencilPaper from '../../../../assets/img/pencil-and-paper.png';
import NavArrowButton from '../NavArrowButton';

const Step2 = (props: StepProps): React.ReactElement => {
  return (
    <div className="step-2">
      <div className="flex-wrapper">
        <img src={getPaper} alt="Get a piece of paper and your lucky pencil." />
        <img className="img-center" src={pencilPaper} alt="Paper and pencil." />
        <div className="dragon-boi right">
          <img src={dragonSet} className="dragon" alt="dragon saying 'Set?'" />
        </div>
      </div>
      <NavArrowButton navDirection={'left'} buttonNav={props.buttonNav} />
      <NavArrowButton navDirection={'right'} buttonNav={props.buttonNav} />
    </div>
  );
};

export default Step2;
