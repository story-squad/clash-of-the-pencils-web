import React from 'react';
import DraggableDragon from './DraggableDragon';
import { DropZone } from '../DropZone';

const DragonBank = (props: any): React.ReactElement => {
  return (
    <div className="dragon-bank">
      <DropZone
        id="vote-1"
        isDropDisabled={props.DnDState['vote-1'].isEmpty ? false : true}
      >
        {dragons[props.DnDState['vote-1'].contents]}
      </DropZone>
      <DropZone
        id="vote-2"
        isDropDisabled={props.DnDState['vote-2'].isEmpty ? false : true}
      >
        {dragons[props.DnDState['vote-2'].contents]}
      </DropZone>
      <DropZone
        id="vote-3"
        isDropDisabled={props.DnDState['vote-3'].isEmpty ? false : true}
      >
        {dragons[props.DnDState['vote-3'].contents]}
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
