import React from 'react';
import { voting } from '../../../state';
import { time } from '../../../utils';
import { Sticker } from '../../atoms';
import SubmissionCardDropZone from './SubmissionCardDropZone';

export interface SubmissionCardFooterProps
  extends SubmissionCardFooterBadgeProps {
  codename: string;
  age: number;
  openSubmission: () => void;
}

export default function SubmissionCardFooter({
  age,
  codename,
  openSubmission,
  ...props
}: SubmissionCardFooterProps): React.ReactElement {
  return (
    <div className="submission-card-footer" onClick={openSubmission}>
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
  hasRead: boolean;
  phase: time.eventType;
  hasReadAll: boolean;
  userHasVoted: boolean;
}

function SubmissionCardFooterBadge({
  hasRead,
  phase,
  position,
  hasReadAll,
  userHasVoted,
}: SubmissionCardFooterBadgeProps): React.ReactElement {
  const readMeSticker = <Sticker type="readMe" className="read-me" />;
  const checkSticker = <Sticker type="checkmark" />;
  const dropZoneSticker = <SubmissionCardDropZone position={position} />;
  if (phase === 'vote') {
    if (userHasVoted) {
      return checkSticker;
    } else if (hasReadAll) {
      return dropZoneSticker;
    } else if (hasRead) {
      return checkSticker;
    } else {
      return readMeSticker;
    }
  } else return readMeSticker;
}
