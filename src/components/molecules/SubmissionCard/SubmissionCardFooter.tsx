import React from 'react';
import { voting } from '../../../state';
import { time } from '../../../utils';
import { Sticker } from '../../atoms';
import SubmissionCardDropZone from './SubmissionCardDropZone';

export interface SubmissionCardFooterProps
  extends SubmissionCardFooterBadgeProps {
  codename: string;
  age: number;
}

export default function SubmissionCardFooter({
  age,
  codename,
  ...props
}: SubmissionCardFooterProps): React.ReactElement {
  return (
    <div className="submission-card-footer">
      <div className="content-left">
        <h2>{codename}</h2>
        <h3>Age: {age}</h3>
      </div>
      <SubmissionCardFooterBadge {...props} />
    </div>
  );
}

interface SubmissionCardFooterBadgeProps {
  position: voting.Places;
  openSubmission: () => void;
  hasRead: boolean;
  enableDropZone: boolean;
  phase: time.eventType;
}

function SubmissionCardFooterBadge({
  enableDropZone,
  hasRead,
  openSubmission,
  phase,
  position,
}: SubmissionCardFooterBadgeProps): React.ReactElement {
  if (phase === 'stream' || !enableDropZone) {
    return (
      <Sticker type="readMe" onClick={openSubmission} className="read-me" />
    );
  } else if (phase === 'vote') {
    if (hasRead) {
      return <Sticker type="checkmark" />;
    } else {
      return <SubmissionCardDropZone position={position} />;
    }
  } else {
    return (
      <Sticker type="readMe" onClick={openSubmission} className="read-me" />
    );
  }
}
