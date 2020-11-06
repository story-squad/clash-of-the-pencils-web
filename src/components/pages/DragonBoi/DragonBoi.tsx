import React from 'react';

import dragonBoi from '../../../assets/dragon-boi.svg';

const DragonBoi = (): React.ReactElement => {
  return (
    <div className="dragon-boi">
      <img src={dragonBoi} alt="Dragon Boi" />
    </div>
  );
};

export default DragonBoi;
