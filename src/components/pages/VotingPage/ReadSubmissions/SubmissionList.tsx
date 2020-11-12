import React from 'react';
import { Submissions } from '../../../../api';
import { SubCard } from '../../../common';

const SubmissionList = (props: SubmissionListProps): React.ReactElement => {
  return (
    <div className="submission-list">
      {props.list.map((item, i) => (
        <SubmissionItem
          key={i}
          {...item}
          incrementCount={() => props.incrementCount(i)}
        />
      ))}
    </div>
  );
};

const SubmissionItem = (
  props: Submissions.SubItem & { incrementCount: () => void },
): React.ReactElement => {
  return (
    <div className="submission-item">
      <SubCard
        src={props.src}
        alt={props.alt}
        onModalOpen={props.incrementCount}
      />
      <div className="sub-info">
        <p>
          <span className="alt">Username: </span>
          {props.username}
        </p>
        <p>
          <span className="alt">Age: </span>
          {props.age}
        </p>
      </div>
    </div>
  );
};

interface SubmissionListProps {
  list: Submissions.SubItem[];
  incrementCount: (index: number) => void;
}

export default SubmissionList;
