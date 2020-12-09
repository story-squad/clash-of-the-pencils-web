import React from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../../api';
import { dnd, top3 } from '../../../../../state';
import { SubCard } from '../../../../common';
import { dragons } from '../DragonBank/DragonBank';
import { DropZone } from '../DropZone';

const DropBank = (): React.ReactElement => {
  const top3List = useRecoilValue(top3.top3List);

  return (
    <div className="drop-bank">
      {top3List?.map((item, i) => (
        <VotingItem key={i} {...item} dropZoneId={`sub-${i + 1}`} />
      ))}
    </div>
  );
};

const VotingItem = ({ dropZoneId, ...sub }: VotingItemProps) => {
  const dndState = useRecoilValue(dnd.dndContainerState);
  return (
    <div className="voting-item">
      <DropZone id={dropZoneId} isDropDisabled={!dndState[dropZoneId].isEmpty}>
        <div>
          <SubCard {...sub} canPreview={false} />
          <div className="sub-info">
            <p>
              <span className="alt">{sub.username}</span>
            </p>
          </div>
          {dragons[dndState[dropZoneId].contents]}
        </div>
      </DropZone>
    </div>
  );
};

interface VotingItemProps extends Submissions.SubItem {
  dropZoneId: string;
}

export default DropBank;
