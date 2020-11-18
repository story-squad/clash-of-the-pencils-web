import React from 'react';
import { useRecoilState } from 'recoil';
import { DnD } from '../../../../state/';
import RenderCastVotes from './RenderCastVotes';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const CastVoteContainer = (): React.ReactElement => {
  const [DnDState, setDnDState] = useRecoilState(DnD.DnDContainerState);
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
    // ref to destination state object
    const finish = DnDState[destination.droppableId];
    // if we have a destination and the destination contents are also empty we need
    // to update state so the re-render will reflect the new placement of the elements
    if (finish.isEmpty) {
      // create a new source object of the updated contents and isEmpty
      const newStart = {
        contents: '',
        isEmpty: true,
      };
      // create a new destination object of the updated contents and isEmpty
      const newFinish = {
        contents: draggableId,
        isEmpty: false,
      };
      // update state with new state object
      setDnDState({
        // copy in the existing state object
        ...DnDState,
        // update the source contents
        [source.droppableId]: newStart,
        // update the destination contents
        [destination.droppableId]: newFinish,
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <RenderCastVotes />
    </DragDropContext>
  );
};

export default CastVoteContainer;
