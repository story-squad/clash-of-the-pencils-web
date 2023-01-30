import React from 'react';
import { stopPropagation } from '../../../utils';
import { Sticker } from '../../atoms';
import DraggableDragon from '../DragonBank/DraggableDragon';

export interface SubmissionCardDropZoneProps {
  contents: string | undefined;
  isEmpty: boolean;
  isDraggingOver: boolean;
  isUsingPlaceholder: boolean;
  draggingFromThisWith?: string | null | undefined;
  placeholder?: React.ReactNode | null;
}

export default function SubmissionCardDropZone({
  contents,
  isDraggingOver,
  isEmpty,
  placeholder,
}: SubmissionCardDropZoneProps): React.ReactElement {
  return (
    <>
      {placeholder}
      {isEmpty || !contents ? (
        <Sticker
          type="dropZone"
          style={{ opacity: isDraggingOver ? 0.5 : 1 }}
          onClick={stopPropagation}
        />
      ) : (
        <DraggableDragon name={contents} />
      )}
    </>
  );
}
