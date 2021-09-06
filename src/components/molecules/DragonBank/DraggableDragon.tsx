import React, { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { voting } from '../../../state';
import { Sticker } from '../../atoms/';
import { StickerTypes } from '../../atoms/Sticker/Sticker';

export interface DraggableDragonProps {
  place: voting.Places;
  disabled?: boolean;
}

export default function DraggableDragon({
  place,
  disabled = false,
}: DraggableDragonProps): React.ReactElement {
  const stickerType = useMemo<StickerTypes>(
    () => `${voting.getPlaceText(place)}PlaceDragon`,
    [place],
  );
  return (
    <Draggable
      draggableId={`${voting.DRAGON}-${place}`}
      index={0}
      isDragDisabled={disabled}
    >
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <Sticker
          dragRef={innerRef}
          type={stickerType}
          {...draggableProps}
          {...dragHandleProps}
        />
      )}
    </Draggable>
  );
}
