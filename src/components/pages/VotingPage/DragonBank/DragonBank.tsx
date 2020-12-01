import React from 'react';
import { useRecoilValue } from 'recoil';
import emptyDragon from '../../../../assets/img/dragon-outline.png';
import { dnd } from '../../../../state';
import { DropZone } from '../DropZone';
import DraggableDragon from './DraggableDragon';

const DragonBank = (): React.ReactElement => {
  const dndState = useRecoilValue(dnd.dndContainerState);
  return (
    <div className="dragon-bank">
      <DropZone
        id="vote-1"
        isDropDisabled={dndState['vote-1'].isEmpty ? false : true}
      >
        <>
          {/* if the drop zone is empty then render an empty dragon image otherwise null */}
          {dndState['vote-1'].isEmpty ? (
            <div className="empty-dragon">
              <img src={emptyDragon} alt="dragon outline" />
            </div>
          ) : null}
          {/* render the matching Draggable Dragon based on which award is in the container state*/}
          {dragons[dndState['vote-1'].contents]}
        </>
      </DropZone>
      <DropZone
        id="vote-2"
        isDropDisabled={dndState['vote-2'].isEmpty ? false : true}
      >
        <>
          {/* if the drop zone is empty then render an empty dragon image otherwise null */}
          {dndState['vote-2'].isEmpty ? (
            <div className="empty-dragon">
              <img src={emptyDragon} alt="dragon outline" />
            </div>
          ) : null}
          {/* render the matching Draggable Dragon based on which award is in the container state*/}
          {dragons[dndState['vote-2'].contents]}
        </>
      </DropZone>
      <DropZone
        id="vote-3"
        isDropDisabled={dndState['vote-3'].isEmpty ? false : true}
      >
        <>
          {/* if the drop zone is empty then render an empty dragon image otherwise null */}
          {dndState['vote-3'].isEmpty ? (
            <div className="empty-dragon">
              <img src={emptyDragon} alt="dragon outline" />
            </div>
          ) : null}
          {/* render the matching Draggable Dragon based on which award is in the container state*/}
          {dragons[dndState['vote-3'].contents]}
        </>
      </DropZone>
    </div>
  );
};

export interface DragonList {
  [key: string]: JSX.Element;
}
// dictionary used to conditionally render the appropriate Draggable Dragon
export const dragons: DragonList = {
  'award-1': <DraggableDragon id="award-1" index={0} place={1} />,
  'award-2': <DraggableDragon id="award-2" index={0} place={2} />,
  'award-3': <DraggableDragon id="award-3" index={0} place={3} />,
};

export default DragonBank;
