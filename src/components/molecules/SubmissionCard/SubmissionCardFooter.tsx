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
  phase: time.eventType;
  hasReadAll: boolean;
  userHasVoted: boolean;
}

function SubmissionCardFooterBadge({
  hasRead,
  openSubmission,
  phase,
  position,
  userHasVoted,
  hasReadAll,
}: SubmissionCardFooterBadgeProps): React.ReactElement {
  const readMeSticker = (
    <Sticker type="readMe" onClick={openSubmission} className="read-me" />
  );
  const checkSticker = <Sticker type="checkmark" />;
  const dropZoneSticker = <SubmissionCardDropZone position={position} />;
  if (phase === 'vote') {
    if (hasReadAll) {
      if (userHasVoted) return readMeSticker;
      else return dropZoneSticker;
    } else if (hasRead) {
      return checkSticker;
    } else {
      return readMeSticker;
    }
  } else return readMeSticker;
}
