import React from 'react';
import { useRecoilValue } from 'recoil';
import emptyDragon from '../../../../../assets/img/PNGs/dragon-outline.png';
import { dnd } from '../../../../../state';
import { DropZone } from '../DropZone';
import DraggableDragon from './DraggableDragon';

const DragonBank = (): React.ReactElement => {
  const dndState = useRecoilValue(dnd.dndContainerState);
  // array used to map over and create our 3 dragon slots. [0, 0, 0]
  const voteSlots = new Array(3).fill(0);
  return (
    <div className="dragon-bank">
      {voteSlots.map((slot, idx) => {
        const slotNum = idx + 1;
        return (
          <DropZone
            key={idx}
            id={`vote-${slotNum}`}
            isDropDisabled={dndState[`vote-${slotNum}`].isEmpty ? false : true}
          >
            <>
              {/* if the drop zone is empty then render an empty dragon image otherwise null */}
              {dndState[`vote-${slotNum}`].isEmpty ? (
                <div className="empty-dragon">
                  <img src={emptyDragon} width="150" alt="dragon outline" />
                </div>
              ) : null}
              {/* render the matching Draggable Dragon based on which award is in the container state*/}
              {dragons[dndState[`vote-${slotNum}`].contents]}
            </>
          </DropZone>
        );
      })}
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
