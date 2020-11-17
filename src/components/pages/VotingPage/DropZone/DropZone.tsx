import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

const DropZone = ({ id, children }: DropZoneProps): React.ReactElement => {
  return (
    <Droppable droppableId={id}>
      {(provided: DroppableProvided) => (
        <div
          style={{
            border: '2px dashed red',
          }}
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
  children: React.ReactElement;
}

export default DropZone;
