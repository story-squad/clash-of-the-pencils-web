import React from 'react';
import { ReactComponent as Dragon } from '../../../../assets/img/dragon-boi.svg';

const DragonBoi = (): React.ReactElement => {
  return (
    <div className="dragon-boi">
      <Dragon className="dragon" />
    </div>
  );
};

export default DragonBoi;
