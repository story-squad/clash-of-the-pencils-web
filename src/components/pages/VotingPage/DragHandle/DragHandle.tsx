import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

const DragHandle = ({ id, index, children }: DragHandleProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

interface DragHandleProps {
  id: string;
  index: number;
  children: React.ReactElement;
}

export default DragHandle;
