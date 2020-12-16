import React from 'react';
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';

const DropZone = ({
  id,
  isDropDisabled,
  children,
}: DropZoneProps): React.ReactElement => {
  return (
    <Droppable
      droppableId={id}
      direction="horizontal"
      isDropDisabled={isDropDisabled}
    >
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          className={`drop-zone${snapshot.isDraggingOver ? ' drag-over' : ''}${
            snapshot.draggingFromThisWith ? ' drag-from' : ''
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {/* React Beautiful DnD wants to have this placeholder, but it was causing styling issues. 
          I left it commented out to solve that. In a dev environment you will get warnings in the 
          console that won't be displayed in production as a result */}
          {/* {provided.placeholder} */}
        </div>
      )}
    </Droppable>
  );
};

interface DropZoneProps {
  id: string;
  isDropDisabled: boolean;
  children: React.ReactElement;
}

export default DropZone;
