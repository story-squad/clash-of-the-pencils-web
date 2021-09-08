import React, { useEffect } from 'react';
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { voting } from '../../state';

export default function VotingDragAndDropContext({
  children,
}: React.PropsWithChildren<unknown>): React.ReactElement {
  const [dndState, setDndState] = useRecoilState(voting.dragAndDropState);
  useEffect(() => console.log({ dndState }), [dndState]);
  // const voting__onDragStart: DragDropContextProps['onDragStart'] = (
  //   { source, draggableId, mode, type },
  //   {},
  // ) => {
  //   console.log('[DS]', source, draggableId, mode, type);
  //   // Mark the zone as empty!
  //   setDndState((prev) => ({
  //     ...prev,
  //     [source.droppableId]: {
  //       contents: undefined,
  //       isEmpty: true,
  //     },
  //   }));
  // };

  const voting__onDragEnd: DragDropContextProps['onDragEnd'] = (
    { draggableId, source, destination, mode, reason, type, combine },
    {},
  ) => {
    console.log(
      '[DE]',
      draggableId,
      source,
      destination,
      mode,
      reason,
      type,
      combine,
    );
    if (!destination) {
      // If no destination, move it back
      setDndState((prev) => ({
        ...prev,
        [source.droppableId]: { contents: draggableId, isEmpty: false }, // Move the curreent draggable back to its source
      }));
    } else {
      // Otherwise, move it to its destination (only if the destination is empty!)
      setDndState((prev) => {
        // Check if our destination container is empty before dropping our draggable
        const destIsEmpty = prev[destination.droppableId].isEmpty;
        if (destIsEmpty) {
          // Move our draggable to the destination
          return {
            ...prev,
            // Empty the source
            [source.droppableId]: { contents: undefined, isEmpty: true },
            // Fill the destination
            [destination.droppableId]: {
              contents: draggableId,
              isEmpty: false,
            },
          };
        } else {
          // Move it back
          return {
            ...prev,
            [source.droppableId]: { contents: draggableId, isEmpty: false },
          };
        }
      });
    }
  };
  return (
    <DragDropContext
      onDragEnd={voting__onDragEnd}
      // onDragStart={voting__onDragStart}
    >
      {children}
    </DragDropContext>
  );
}
