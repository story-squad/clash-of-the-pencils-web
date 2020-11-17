import React from 'react';
import RenderCastVotes from './RenderCastVotes';
import { DragDropContext } from 'react-beautiful-dnd';

const CastVoteContainer = (): React.ReactElement => {
  const onDragEnd = () => {
    // TODO
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <RenderCastVotes />
    </DragDropContext>
  );
};

export default CastVoteContainer;
