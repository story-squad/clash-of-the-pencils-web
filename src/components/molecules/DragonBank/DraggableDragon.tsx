import React, { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { voting } from '../../../state';
import { Sticker } from '../../atoms/';
import { StickerTypes } from '../../atoms/Sticker/Sticker';

export interface DraggableDragonProps {
  name: string;
  dragDisabled?: boolean;
}

export default function DraggableDragon({
  name,
  dragDisabled = false,
}: DraggableDragonProps): React.ReactElement {
  const stickerType = useMemo(
    () => voting.getDragon(name) as StickerTypes,
    [name],
  );
  return stickerType === undefined ? (
    <></>
  ) : (
    <Draggable
      draggableId={name}
      index={+name.split('-')[1]}
      isDragDisabled={dragDisabled}
    >
      {({ draggableProps, innerRef, dragHandleProps }, { isDropAnimating }) => (
        <Sticker
          dragRef={innerRef}
          type={stickerType}
          {...draggableProps}
          {...dragHandleProps}
          style={{
            ...draggableProps.style,
            ...(isDropAnimating && { transitionDuration: '0.0001s' }),
          }}
        />
      )}
    </Draggable>
  );
}
