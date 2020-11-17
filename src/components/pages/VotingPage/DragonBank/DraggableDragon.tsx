import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

// Current emptyDragon is the wrong shape/color
import emptyDragon from '../../../../assets/empty-dragon.svg';
import dragonBoi from '../../../../assets/dragon-boi.svg';

const DraggableDragon = ({
  place,
  id,
  index,
}: DraggableDragonProps): React.ReactElement => {
  // Later this needs to be replaced with a recoil selector that checks if
  // this place has been chosen already, and conditionally renders a clear or
  // a full dragon based off of that
  const wasDragged = false;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="draggable-dragon"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img src={wasDragged ? emptyDragon : dragonBoi} alt={`${place}`} />
        </div>
      )}
    </Draggable>
  );
};

interface DraggableDragonProps {
  place: number;
  id: string;
  index: number;
}

export default DraggableDragon;
