import React from 'react';
import { voting } from '../../../state';
import SubmissionCardDropZone from './SubmissionCardDropZone';

export interface SubmissionCardFooterProps {
  codename: string;
  age: number;
  position: voting.Places;
}

export default function SubmissionCardFooter({
  age,
  codename,
  position,
}: SubmissionCardFooterProps): React.ReactElement {
  return (
    <div className="submission-card-footer">
      <div className="content-left">
        <h2>{codename}</h2>
        <h3>Age: {age}</h3>
      </div>
      <SubmissionCardDropZone position={position} />
    </div>
  );
}
