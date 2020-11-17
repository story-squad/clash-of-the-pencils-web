import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

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
      {(provided: DroppableProvided) => (
        <div
          className="drop-zone"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
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
