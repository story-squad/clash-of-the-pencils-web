import React from 'react';

// Current emptyDragon is the wrong shape/color
import emptyDragon from '../../../../assets/empty-dragon.svg';
import dragonBoi from '../../../../assets/dragon-boi.svg';

const DraggableDragon = ({
  place,
}: DraggableDragonProps): React.ReactElement => {
  // Later this needs to be replaced with a recoil selector that checks if
  // this place has been chosen already, and conditionally renders a clear or
  // a full dragon based off of that
  const wasDragged = false;

  return (
    <div className="draggable-dragon">
      <img src={wasDragged ? emptyDragon : dragonBoi} alt={`${place}`} />
    </div>
  );
};

interface DraggableDragonProps {
  place: number;
}

export default DraggableDragon;
