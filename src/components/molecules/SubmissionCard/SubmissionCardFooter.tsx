import React from 'react';
import { time } from '../../../utils';
import { Sticker } from '../../atoms';
import SubmissionCardDropZone, {
  SubmissionCardDropZoneProps,
} from './SubmissionCardDropZone';

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

interface SubmissionCardFooterBadgeProps extends SubmissionCardDropZoneProps {
  hasRead: boolean;
  phase: time.eventType;
  hasReadAll: boolean;
  userHasVoted: boolean;
}

function SubmissionCardFooterBadge({
  hasRead,
  phase,
  hasReadAll,
  userHasVoted,
  ...dropZoneProps
}: SubmissionCardFooterBadgeProps): React.ReactElement {
  const readMeSticker = <Sticker type="readMe" className="read-me" />;
  const checkSticker = <Sticker type="checkmark" />;
  const dropZoneSticker = <SubmissionCardDropZone {...dropZoneProps} />;
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
