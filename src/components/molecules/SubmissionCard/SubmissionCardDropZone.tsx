import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { voting } from '../../../state';
import { DropZone, Sticker } from '../../atoms';
import DraggableDragon from '../DragonBank/DraggableDragon';

export interface SubmissionCardDropZoneProps {
  /** The submission's index in the `top3` array + 1 */
  position: voting.Places;
}

export default function SubmissionCardDropZone({
  position,
}: SubmissionCardDropZoneProps): React.ReactElement {
  const contents = useRecoilValue(
    voting.contentsOf(`${voting.DROP_ZONE}-${position}`),
  );
  const dragonPlace = useMemo(() => {
    if (!contents) return undefined;
    else return +contents.split('-')[1] as voting.Places;
  }, [contents]);
  console.log('[SCDZ]', position, contents, dragonPlace);
  return (
    <DropZone
      name={`${voting.DROP_ZONE}-${position}`}
      type={voting.DRAGON}
      isDisabled={contents !== undefined}
    >
      {dragonPlace ? (
        <DraggableDragon place={dragonPlace} />
      ) : (
        <Sticker type="dropZone" />
      )}
    </DropZone>
  );
}
