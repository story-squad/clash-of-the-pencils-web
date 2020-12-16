import React from 'react';
import { ReactComponent as DragonBoi } from '../../../../assets/img/dragon-boi.svg';
import pencilPaper from '../../../../assets/img/pencil-and-paper.png';

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
      <div className="dragon-boi">
        <DragonBoi className="dragon" />
      </div>
    </div>
  );
};

export default Step2;
