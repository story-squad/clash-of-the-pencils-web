import React from 'react';
import { SubmissionCard } from '../../molecules';
import './styles/bigWinner.scss';

export default function BigWinner({
  winnerId,
}: {
  winnerId: number;
}): React.ReactElement {
  return (
    <div className="big-winner">
      <div className="winner-content">
        <h2>Latest Champion</h2>
        <p>
          Here&apos;s the story that won our last contest. Click on the picture
          to get a better&nbsp;look!
        </p>
      </div>
      <div className="center-grow">
        <SubmissionCard droppable={false} submissionId={winnerId} />
      </div>
    </div>
  );
}
