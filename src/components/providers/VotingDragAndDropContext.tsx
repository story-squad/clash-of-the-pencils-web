import React from 'react';
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import { voting } from '../../state';

export default function VotingDragAndDropContext({
  children,
}: React.PropsWithChildren<unknown>): React.ReactElement {
  const setDndState = useSetRecoilState(voting.dragAndDropState);

  const voting__onDragStart: DragDropContextProps['onDragStart'] = (
    { source },
    {},
  ) => {
    // Mark the zone as empty!
    setDndState((prev) => ({
      ...prev,
      [source.droppableId]: undefined,
    }));
  };

  const voting__onDragEnd: DragDropContextProps['onDragEnd'] = (
    { draggableId, source, destination },
    {},
  ) => {
    if (!destination) {
      // If no destination, move it back
      setDndState((prev) => ({
        ...prev,
        [source.droppableId]: draggableId, // Move the curreent draggable back to its source
      }));
    } else {
      // Otherwise, move it to its destination (only if the destination is empty!)
      setDndState((prev) => {
        // Check if our destination container is empty before dropping our draggable
        const destIsEmpty = prev[destination.droppableId] === undefined;
        if (destIsEmpty) {
          // Move our draggable to the destination
          return {
            ...prev,
            // Empty the source
            [source.droppableId]: undefined,
            // Fill the destination
            [destination.droppableId]: draggableId,
          };
        } else {
          // Move it back
          return { ...prev, [source.droppableId]: draggableId };
        }
      });
    }
  };
  return (
    <DragDropContext
      onDragEnd={voting__onDragEnd}
      onDragStart={voting__onDragStart}
    >
      {children}
    </DragDropContext>
  );
}
