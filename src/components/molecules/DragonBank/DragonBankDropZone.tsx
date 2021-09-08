import React from 'react';
import { useRecoilValue } from 'recoil';
import { voting } from '../../../state';
import { DropZone, Sticker } from '../../atoms';
import DraggableDragon from './DraggableDragon';

export interface DragonBankDropZoneProps {
  place: voting.Places;
}

export default function DragonBankDropZone({
  place,
}: DragonBankDropZoneProps): React.ReactElement {
  const contents = useRecoilValue(
    voting.contentsOf(`${voting.DRAG_BANK}-${place}`),
  );

  return (
    <DropZone
      name={`${voting.DRAG_BANK}-${place}`}
      type={voting.DRAGON}
      isDisabled={contents !== undefined} // Disable drop if container isn't empty
    >
      <DraggableDragon place={place} />
      {!contents && <Sticker type="dropZone" />}
      {/* {place && <DraggableDragon place={place} />} */}
    </DropZone>
  );
}
