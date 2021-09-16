import React from 'react';
import { DropZone, Sticker } from '../../atoms';
import DraggableDragon from './DraggableDragon';

export interface DragonBankDropZoneProps {
  name: string;
  dragDisabled?: boolean;
}

export default function DragonBankDropZone({
  name,
  dragDisabled = false,
}: DragonBankDropZoneProps): React.ReactElement {
  return (
    <DropZone name={name}>
      {({ contents, isEmpty, isDraggingOver }) =>
        isEmpty || !contents ? (
          <Sticker
            type="dropZone"
            style={{ opacity: isDraggingOver ? 0.5 : 1 }}
          />
        ) : (
          <DraggableDragon name={contents} dragDisabled={dragDisabled} />
        )
      }
    </DropZone>
  );
}
