import React from 'react';
import { StepProps } from './RenderSteps';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import scribbleDown from '../../../../assets/img/scribble-down.png';
import writingStory from '../../../../assets/img/writing-story.png';
import NavArrowButton from '../NavArrowButton';

const Step3 = (props: StepProps): React.ReactElement => {
  return (
    <div className="step-3">
      <img
        className="img-center"
        src={scribbleDown}
        alt="2. Scribble down a story. 1 page by hand."
      />
      <img
        className="img-center"
        src={writingStory}
        alt="Hand with pencil writing a story."
      />
      <div className="dragon-boi">
        <DragonBoi className="dragon" />
      </div>
      <NavArrowButton navDirection={'left'} buttonNav={props.buttonNav} />
      <NavArrowButton navDirection={'right'} buttonNav={props.buttonNav} />
    </div>
  );
};

export default Step3;
