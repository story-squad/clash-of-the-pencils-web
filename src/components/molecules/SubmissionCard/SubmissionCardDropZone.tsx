import React from 'react';
import { voting } from '../../../state';
import { stopPropagation } from '../../../utils';
import { DropZone, Sticker } from '../../atoms';
import DraggableDragon from '../DragonBank/DraggableDragon';

export interface SubmissionCardDropZoneProps {
  /** The submission's index in the `top3` array + 1 */
  position: voting.Places;
}

export default function SubmissionCardDropZone({
  position,
}: SubmissionCardDropZoneProps): React.ReactElement {
  const name = `${voting.SUBMISSION_ZONE}-${position}`;
  return (
    <DropZone name={name}>
      {({ contents, isEmpty, isDraggingOver }) =>
        isEmpty || !contents ? (
          <Sticker
            type="dropZone"
            style={{ opacity: isDraggingOver ? 0.5 : 1 }}
            onClick={stopPropagation}
          />
        ) : (
          <DraggableDragon name={contents} />
        )
      }
    </DropZone>
  );
}
