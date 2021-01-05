import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Submissions } from '../../../../../api';
import { ReactComponent as GreenCheck } from '../../../../../assets/img/green-check.svg';
import { top3 } from '../../../../../state';
import { SubCard } from '../../../../common';

const ReadTop3 = (): React.ReactElement => {
  const top3List = useRecoilValue(top3.top3List);
  const [viewed, setViewed] = useRecoilState(top3.hasReadState);

  const markIndexRead = (index: number) => {
    if (!viewed[index]) {
      setViewed((cur) => [
        ...cur.slice(0, index),
        true,
        ...cur.slice(index + 1),
      ]);
    }
  };

  return (
    <div className="read-top-3">
      {top3List?.map((item, i) => (
        <SubmissionItem
          key={i}
          {...item}
          // Call markIndexRead on the current index
          markIndexRead={() => markIndexRead(i)}
          read={viewed[i]}
        />
      ))}
    </div>
  );
};

const SubmissionItem = ({
  markIndexRead,
  read,
  ...sub
}: SubmissionItemComponentProps): React.ReactElement => {
  return (
    <div className="submission-item">
      <SubCard {...sub} onModalOpen={markIndexRead} />
      <div className={`check${read ? ' finished' : ''}`}>
        <GreenCheck />
      </div>
      <div className="sub-info">
        <p>
          <span className="alt">Codename: </span>
          {sub.username}
        </p>
        {/* <p>
          <span className="alt">Age: </span>
          {props.age}
        </p> */}
      </div>
    </div>
  );
};

interface SubmissionItemComponentProps extends Submissions.SubItem {
  markIndexRead: () => void;
  read: boolean;
}

export default ReadTop3;
