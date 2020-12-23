import React from 'react';
import { StepProps } from './RenderSteps';
import dragonGo from '../../../../assets/img/dragon-go.png';
import scribbleDown from '../../../../assets/img/scribble-down.png';
import writingStory from '../../../../assets/img/writing-story.png';
import NavArrowButton from '../NavArrowButton';

const Step3 = (props: StepProps): React.ReactElement => {
  return (
    <div className="step-3">
      <div className="flex-wrapper">
        <img
          className="img-center"
          src={scribbleDown}
          alt="Scribble down a 1-page story by hand."
        />
        <img
          className="img-center"
          src={writingStory}
          alt="Hand with pencil writing a story."
        />
        <div className="dragon-boi">
          <img src={dragonGo} className="dragon" alt="dragon saying 'Go!'" />
        </div>
      </div>
      <NavArrowButton navDirection={'left'} buttonNav={props.buttonNav} />
      <NavArrowButton navDirection={'right'} buttonNav={props.buttonNav} />
    </div>
  );
};

export default Step3;
