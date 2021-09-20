import React from 'react';
import { voting } from '../../../state';
import { time } from '../../../utils';
import { Sticker } from '../../atoms';
import SubmissionCardDropZone from './SubmissionCardDropZone';

export interface SubmissionCardFooterProps {
  codename: string;
  age: number;
  position: voting.Places;
  openSubmission: () => void;
  hasRead: boolean;
  hasReadAll: boolean;
  phase: time.eventType;
}

export default function SubmissionCardFooter({
  age,
  codename,
  position,
  openSubmission,
  hasRead,
  hasReadAll,
  phase,
}: SubmissionCardFooterProps): React.ReactElement {
  return (
    <div className="submission-card-footer">
      <div className="content-left">
        <h2>{codename}</h2>
        <h3>Age: {age}</h3>
      </div>
      {phase === 'stream' && (
        <Sticker type="readMe" onClick={openSubmission} className="read-me" />
      )}
      {phase === 'vote' &&
        (hasReadAll ? (
          <SubmissionCardDropZone position={position} />
        ) : hasRead ? (
          <Sticker type="checkmark" />
        ) : (
          <Sticker type="readMe" onClick={openSubmission} className="read-me" />
        ))}
    </div>
  );
}
