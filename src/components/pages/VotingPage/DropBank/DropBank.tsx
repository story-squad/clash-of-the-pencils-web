import React from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../api';
import { top3 } from '../../../../state';
import { SubCard } from '../../../common';

import { DropZone } from '../DropZone';
import { dragons } from '../DragonBank/DragonBank';

const DropBank = (props: any): React.ReactElement => {
  const top3List = useRecoilValue(top3.top3List);

  return (
    <div className="drop-bank">
      {top3List?.map((item, i) => (
        <VotingItem
          key={i}
          {...item}
          dropZoneId={`sub-${i + 1}`}
          DnDState={props.DnDState}
        />
      ))}
    </div>
  );
};

const VotingItem = (props: VotingItemProps) => {
  return (
    <div className="voting-item">
      <DropZone
        id={props.dropZoneId}
        isDropDisabled={!props.DnDState[props.dropZoneId].isEmpty}
      >
        <>
          <SubCard src={props.src} alt={props.alt} canPreview={false} />
          {dragons[props.DnDState[props.dropZoneId].contents]}
        </>
      </DropZone>
      <div className="sub-info">
        <p>
          <span className="alt">{props.username}</span> {props?.age}
        </p>
      </div>
    </div>
  );
};

interface VotingItemProps extends Submissions.SubItem {
  dropZoneId: string;
  DnDState: any;
}

export default DropBank;
