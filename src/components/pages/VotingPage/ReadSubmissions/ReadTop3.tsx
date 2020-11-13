import React from 'react';
import { Submissions } from '../../../../api';
import { SubCard } from '../../../common';
import { useRecoilValue, useRecoilState } from 'recoil';
import { top3 } from '../../../../state';

const ReadTop3 = (): React.ReactElement => {
  const top3List = useRecoilValue(top3.top3State);
  const [viewed, setViewed] = useRecoilState(top3.readState);

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
    <div className="submission-list">
      {top3List &&
        top3List.map((item, i) => (
          <SubmissionItem
            key={i}
            {...item}
            // Call markIndexRead on the current index
            markIndexRead={() => markIndexRead(i)}
          />
        ))}
    </div>
  );
};

const SubmissionItem = (
  props: Submissions.SubItem & { markIndexRead: () => void },
): React.ReactElement => {
  return (
    <div className="submission-item">
      <SubCard
        src={props.src}
        alt={props.alt}
        onModalOpen={props.markIndexRead}
      />
      <div className="sub-info">
        <p>
          <span className="alt">Username : </span>
          {props.username}
        </p>
        <p>
          <span className="alt">Age : </span>
          {props.age}
        </p>
      </div>
    </div>
  );
};

export default ReadTop3;
