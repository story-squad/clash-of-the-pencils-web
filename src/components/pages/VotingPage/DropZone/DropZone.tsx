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
  /**
   * returns a class name to the drop zone based on the DnD snapshot
   * to conditionally change the background color of the drop zone
   * for user feed back during a drag
   */
  const returnClassName = (snapshot: DroppableStateSnapshot): string => {
    // returns class name for styling background color
    // if the drop zone is being dragged over
    if (snapshot.isDraggingOver) {
      return 'drop-zone drag-over';
    }
    // returns class name for styling background colo
    // if the drop zone is being dragged from but not over
    if (snapshot.draggingFromThisWith) {
      return 'drop-zone drag-from';
    }
    // default class name with no background color styling
    return 'drop-zone';
  };
  return (
    <Droppable
      droppableId={id}
      direction="horizontal"
      isDropDisabled={isDropDisabled}
    >
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          className={returnClassName(snapshot)}
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
