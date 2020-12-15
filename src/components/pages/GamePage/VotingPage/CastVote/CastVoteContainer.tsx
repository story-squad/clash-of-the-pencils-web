import React from 'react';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { dnd } from '../../../../../state';
import RenderCastVotes from './RenderCastVotes';

const CastVoteContainer = (): React.ReactElement => {
  const [dndState, setDndState] = useRecoilState(dnd.dndContainerState);
  /**
   * Callback used by React Beautiful DnD to update state at the beginning of a drag event.
   * This is being used to render the dragon outline image when a user starts dragging a dragon
   */
  const onDragStart = (start: DragStart) => {
    // get the source drop zone
    const { source } = start;
    // update state of the source drop zone to show as empty
    setDndState({
      ...dndState,
      [source.droppableId]: { ...dndState[source.droppableId], isEmpty: true },
    });
  };
  /**
   * Callback required by DragDropContext to update state after a user ends a drag event
   */
  const onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result;
    // if the draggable was dropped outside a droppable we don't need to do anything so return
    if (!destination) {
      // update state to show the drop zone is once again occupied
      setDndState({
        ...dndState,
        [source.droppableId]: {
          ...dndState[source.droppableId],
          isEmpty: false,
        },
      });
    }
    if (destination) {
      // if the source id and index is the same as the destination id and index
      // then it was moved around but then dropped back in the original spot
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        // update state to show the drop zone is once again occupied
        setDndState({
          ...dndState,
          [source.droppableId]: {
            ...dndState[source.droppableId],
            isEmpty: false,
          },
        });
      }
      // ref to destination state object
      const finish = dndState[destination.droppableId];
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
        setDndState({
          // copy in the existing state object
          ...dndState,
          // update the source contents
          [source.droppableId]: newStart,
          // update the destination contents
          [destination.droppableId]: newFinish,
        });
      }
    }
  };
  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <RenderCastVotes />
    </DragDropContext>
  );
};

export default CastVoteContainer;
