import React from 'react';
import pencilPaper from '../../../../assets/img/pencil-and-paper.png';

import { DragonBoi } from '../Home/DragonBoi';
const Step2 = (): React.ReactElement => {
  return (
    <div className="step-2">
      <h2>Step 2</h2>
      <h3>
        Go Get Your Lucky Pencil
        <br />
        and Some Paper!
      </h3>
      <img className="img-center" src={pencilPaper} alt="Paper and pencil." />
      <DragonBoi />
    </div>
  );
};

export default Step2;
