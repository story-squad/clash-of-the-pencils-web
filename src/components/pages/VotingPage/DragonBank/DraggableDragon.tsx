import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import firstDragon from '../../../../assets/img/first-place-dragon.png';
import secondDragon from '../../../../assets/img/second-place-dragon.png';
import thirdDragon from '../../../../assets/img/third-place-dragon.png';

const DraggableDragon = ({
  place,
  id,
  index,
}: DraggableDragonProps): React.ReactElement => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="draggable-dragon"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img src={DragonImageList[place]} alt={`${place}`} />
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

interface DragonList {
  [key: number]: string;
}

const DragonImageList: DragonList = {
  1: firstDragon,
  2: secondDragon,
  3: thirdDragon,
};

export default DraggableDragon;
