import React from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../api';
import { top3 } from '../../../../state';
import { SubCard } from '../../../common';

import { DropZone } from '../DropZone';

const DropBank = (): React.ReactElement => {
  const top3List = useRecoilValue(top3.top3List);

  return (
    <div className="drop-bank">
      {top3List?.map((item, i) => (
        <DropZone key={i} id={`sub-${i + 1}`}>
          <VotingItem key={i} {...item} />
        </DropZone>
      ))}
    </div>
  );
};

const VotingItem = (props: Submissions.SubItem) => {
  return (
    <div className="voting-item">
      <SubCard src={props.src} alt={props.alt} canPreview={false} />
      <div className="sub-info">
        <p>
          <span className="alt">{props.username}</span> {props?.age}
        </p>
      </div>
    </div>
  );
};

export default DropBank;
