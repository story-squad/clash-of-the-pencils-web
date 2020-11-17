import React from 'react';
import DraggableDragon from './DraggableDragon';

const DragonBank = (): React.ReactElement => {
  return (
    <div className="dragon-bank">
      <DraggableDragon place={1} />
      <DraggableDragon place={2} />
      <DraggableDragon place={3} />
    </div>
  );
};

export default DragonBank;
