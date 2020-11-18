import React from 'react';
import { useRecoilValue } from 'recoil';
import { DnD } from '../../../../state';
import DraggableDragon from './DraggableDragon';
import { DropZone } from '../DropZone';

const DragonBank = (): React.ReactElement => {
  const DnDState = useRecoilValue(DnD.DnDContainerState);
  return (
    <div className="dragon-bank">
      <DropZone
        id="vote-1"
        isDropDisabled={DnDState['vote-1'].isEmpty ? false : true}
      >
        {dragons[DnDState['vote-1'].contents]}
      </DropZone>
      <DropZone
        id="vote-2"
        isDropDisabled={DnDState['vote-2'].isEmpty ? false : true}
      >
        {dragons[DnDState['vote-2'].contents]}
      </DropZone>
      <DropZone
        id="vote-3"
        isDropDisabled={DnDState['vote-3'].isEmpty ? false : true}
      >
        {dragons[DnDState['vote-3'].contents]}
      </DropZone>
    </div>
  );
};

export interface DragonList {
  [key: string]: JSX.Element;
}

export const dragons: DragonList = {
  'award-1': <DraggableDragon id="award-1" index={0} place={1} />,
  'award-2': <DraggableDragon id="award-2" index={0} place={2} />,
  'award-3': <DraggableDragon id="award-3" index={0} place={3} />,
};

export default DragonBank;
