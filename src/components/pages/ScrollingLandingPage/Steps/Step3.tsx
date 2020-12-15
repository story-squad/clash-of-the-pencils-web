import React from 'react';
import scribbleDown from '../../../../assets/img/scribble-down.png';
import writingStory from '../../../../assets/img/writing-story.png';
import { DragonBoi } from '../Home/DragonBoi';

const Step3 = (): React.ReactElement => {
  return (
    <div className="step-3">
      <h2>Step 3</h2>
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
      <DragonBoi />
    </div>
  );
};

export default Step3;
