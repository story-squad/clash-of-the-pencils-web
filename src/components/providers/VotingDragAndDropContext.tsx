import React, { useCallback } from 'react';
import {
  DragDropContext,
  DragDropContextProps,
  DragStart,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import { dnd } from '../../state';

export default function VotingDragAndDropContext({
  children,
}: React.PropsWithChildren<unknown>): React.ReactElement {
  const updateDrop = useSetRecoilState(dnd.updateDropZone);

  const voting__onDragStart = useCallback(
    ({}: DragStart, {}: ResponderProvided) => undefined,
    [updateDrop],
  );

  const voting__onDragEnd: DragDropContextProps['onDragEnd'] = useCallback(
    (
      { source, destination, draggableId }: DropResult,
      {}: ResponderProvided,
    ) => {
      if (!destination) return; // Do nothing!
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return; // Do nothing!
      } else {
        // And the source...
        const newSource: dnd.DropZoneContainer = {
          contents: undefined,
          isEmpty: true,
        };
        updateDrop({ key: source.droppableId, contents: newSource });
        // Here we need to update the destination...
        const newDestination: dnd.DropZoneContainer = {
          contents: draggableId,
          isEmpty: false,
        };
        updateDrop({ key: destination.droppableId, contents: newDestination });
      }
    },
    [updateDrop],
  );
  return (
    <DragDropContext
      onDragEnd={voting__onDragEnd}
      onDragStart={voting__onDragStart}
    >
      {children}
    </DragDropContext>
  );
}
