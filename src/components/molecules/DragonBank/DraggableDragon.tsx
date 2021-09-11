import React, { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { voting } from '../../../state';
import { Sticker } from '../../atoms/';
import { StickerTypes } from '../../atoms/Sticker/Sticker';

export interface DraggableDragonProps {
  name: string;
}

export default function DraggableDragon({
  name,
}: DraggableDragonProps): React.ReactElement {
  const stickerType = useMemo(
    () => voting.getDragon(name) as StickerTypes,
    [name],
  );
  return stickerType === undefined ? (
    <></>
  ) : (
    <Draggable draggableId={name} index={+name.split('-')[1]}>
      {({ draggableProps, innerRef, dragHandleProps }, {}) => (
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
