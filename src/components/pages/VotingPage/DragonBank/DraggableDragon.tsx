import React from 'react';

// Current emptyDragon is the wrong shape/color
import emptyDragon from '../../../../assets/empty-dragon.svg';
import dragonBoi from '../../../../assets/dragon-boi.svg';

import { DragHandle } from '../DragHandle';

const DraggableDragon = ({
  place,
  id,
}: DraggableDragonProps): React.ReactElement => {
  // Later this needs to be replaced with a recoil selector that checks if
  // this place has been chosen already, and conditionally renders a clear or
  // a full dragon based off of that
  const wasDragged = false;

  return (
    <DragHandle id={id} index={0}>
      <div className="draggable-dragon">
        <img src={wasDragged ? emptyDragon : dragonBoi} alt={`${place}`} />
      </div>
    </DragHandle>
  );
};

interface DraggableDragonProps {
  place: number;
  id: string;
}

export default DraggableDragon;
