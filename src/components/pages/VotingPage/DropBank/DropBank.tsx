import React from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../api';
import { top3 } from '../../../../state';
import { SubCard } from '../../../common';

const DropBank = (): React.ReactElement => {
  const top3List = useRecoilValue(top3.top3List);

  return (
    <div className="drop-bank">
      {top3List?.map((item, i) => (
        <VotingItem key={i} {...item} />
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
