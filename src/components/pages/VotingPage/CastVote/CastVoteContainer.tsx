import React, { useState } from 'react';
import RenderCastVotes from './RenderCastVotes';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const CastVoteContainer = (): React.ReactElement => {
  const [DnDContainerState, setDnDContainerState] = useState<DnDContainerState>(
    initDnDContainerState,
  );
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    // if the draggable was dropped outside a droppable we don't need to do anything so return
    if (!destination) {
      return;
    }
    // if the source id and index is the same as the destination id and index
    // then it was moved around but then dropped back in the original spot
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      //we don't need to do anything so return
      return;
    }
    // refs to source and destination state objects
    const start = DnDContainerState[source.droppableId];
    const finish = DnDContainerState[destination.droppableId];
    // if we have a destination and the destination contents are also empty we need
    // to update state so the re-render will reflect the new placement of the elements
    if (finish.isEmpty) {
      // create a new array copied from the source
      //const startAwards = [...start.contents];
      // cut out the draggable
      //startAwards.splice(source.index, 1);
      // create a new object of the updated contents and isEmpty
      const newStart = {
        contents: '',
        isEmpty: true,
      };
      // create a new array copied from the destination
      //const finishAwards = [...finish.contents];
      // splice the draggable into place at the destination
      //finishAwards.splice(destination.index, 0, draggableId);
      // create a new object of the updated contents and isEmpty
      const newFinish = {
        contents: draggableId,
        isEmpty: false,
      };
      // update state with new state object
      setDnDContainerState({
        // copy in the existing state object
        ...DnDContainerState,
        // update the source contents
        [source.droppableId]: newStart,
        // update the destination contents
        [destination.droppableId]: newFinish,
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <RenderCastVotes DnDState={DnDContainerState} />
    </DragDropContext>
  );
};

interface DnDContainerState {
  [key: string]: ContainerState;
}

interface ContainerState {
  contents: string;
  isEmpty: boolean;
}

const initDnDContainerState: DnDContainerState = {
  'sub-1': { contents: '', isEmpty: true },
  'sub-2': { contents: '', isEmpty: true },
  'sub-3': { contents: '', isEmpty: true },
  'vote-1': { contents: 'award-1', isEmpty: false },
  'vote-2': { contents: 'award-2', isEmpty: false },
  'vote-3': { contents: 'award-3', isEmpty: false },
};

export default CastVoteContainer;
