import React, { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';
import { voting } from '../../../state';
import { Sticker } from '../../atoms/';
import { StickerTypes } from '../../atoms/Sticker/Sticker';

export interface DraggableDragonProps {
  place?: voting.Places;
  disabled?: boolean;
}

const portal = document.createElement('div');
portal.classList.add('draggable-dragon', 'in-portal');
document.body.appendChild(portal);

export default function DraggableDragon({
  place,
  disabled = false,
}: DraggableDragonProps): React.ReactElement {
  const stickerType = useMemo<StickerTypes | undefined>(
    () => (place ? `${voting.getPlaceText(place)}PlaceDragon` : undefined),
    [place],
  );
  return stickerType === undefined ? (
    <></>
  ) : (
    <Draggable
      draggableId={`${voting.DRAGON}-${place}`}
      index={0}
      isDragDisabled={disabled}
    >
      {({ draggableProps, innerRef, dragHandleProps }, { isDragging }) => {
        const child = (
          <Sticker
            dragRef={innerRef}
            type={stickerType}
            {...draggableProps}
            {...dragHandleProps}
          />
        );
        if (isDragging) {
          return createPortal(child, portal);
        } else {
          return child;
        }
      }}
    </Draggable>
  );
}
