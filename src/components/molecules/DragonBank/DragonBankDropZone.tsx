import React from 'react';
import { useRecoilValue } from 'recoil';
import { voting } from '../../../state';
import { DropZone } from '../../atoms';
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
  // const dragonPlace = useMemo(() => {
  // if (!contents) return undefined;
  // else return +contents.split('-')[1] as voting.Places;
  // }, []);

  return (
    <DropZone
      name={`${voting.DRAG_BANK}-${place}`}
      type={voting.DRAGON}
      isDisabled={contents !== undefined} // Disable drop if container isn't empty
    >
      {/* {dragonPlace && <DraggableDragon place={dragonPlace} />} */}
      {place && <DraggableDragon place={place} />}
    </DropZone>
  );
}
