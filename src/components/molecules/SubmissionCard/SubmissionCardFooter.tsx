import React from 'react';
import { voting } from '../../../state';
import { time } from '../../../utils';
import { Sticker } from '../../atoms';
import SubmissionCardDropZone from './SubmissionCardDropZone';

export interface SubmissionCardFooterProps {
  codename: string;
  age: number;
  position: voting.Places;
  phase: time.eventType;
  openSubmission: () => void;
}

export default function SubmissionCardFooter({
  age,
  codename,
  position,
  phase,
  openSubmission,
}: SubmissionCardFooterProps): React.ReactElement {
  return (
    <div className="submission-card-footer">
      <div className="content-left">
        <h2>{codename}</h2>
        <h3>Age: {age}</h3>
      </div>
      {phase === 'vote' ? (
        <SubmissionCardDropZone position={position} />
      ) : (
        <Sticker type="readMe" onClick={openSubmission} className="read-me" />
      )}
    </div>
  );
}
