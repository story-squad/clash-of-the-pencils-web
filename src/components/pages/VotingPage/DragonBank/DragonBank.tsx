import React from 'react';
import DraggableDragon from './DraggableDragon';
import { DropZone } from '../DropZone';

const DragonBank = (): React.ReactElement => {
  return (
    <div className="dragon-bank">
      <DropZone id="vote-1">
        <DraggableDragon id="award-1" place={1} />
      </DropZone>
      <DropZone id="vote-2">
        <DraggableDragon id="award-2" place={2} />
      </DropZone>
      <DropZone id="vote-3">
        <DraggableDragon id="award-3" place={3} />
      </DropZone>
    </div>
  );
};

export default DragonBank;
