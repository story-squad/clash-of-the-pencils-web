import React from 'react';

import dragonBoi from '../../../assets/dragon-boi.png';

const DragonBoi = (): React.ReactElement => {
  return (
    <div className="dragon-boi">
      <img src={dragonBoi} alt="Dragon Boi mascot" />
    </div>
  );
};

export default DragonBoi;
