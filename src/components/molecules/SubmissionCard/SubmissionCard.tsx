import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { app, voting } from '../../../state';
import { time } from '../../../utils';
import { Card, Picture } from '../../atoms';
import './styles/index.scss';
import SubmissionCardFooter from './SubmissionCardFooter';

export interface SubmissionCardProps {
  submission: Submissions.ISubItem;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  disablePreview?: boolean;
  position: voting.Places;
  phase?: time.eventType;
  hasReadAll?: boolean;
}

export default function SubmissionCard({
  submission,
  position,
  containerProps,
  disablePreview,
  phase = 'vote',
  hasReadAll = false,
}: SubmissionCardProps): React.ReactElement {
  const [hasRead, setHasRead] = useRecoilState(
    voting.hasReadSubInPosition(position),
  );
  const openAnImageFullscreen = useSetRecoilState(app.imageView.openImage);
  const openSubmission = () => {
    openAnImageFullscreen({
      description: submission.prompt,
      source: submission.src,
      rotation: submission.rotation,
    });
    setHasRead(true);
  };
  const age = useMemo(
    () =>
      Math.abs(
        Math.round(
          DateTime.fromISO(submission.dob as string).diffNow('years').years,
        ),
      ),
    [submission],
  );
  return (
    <Card className="submission-card" {...containerProps}>
      <Picture
        source={submission.src}
        description={`Hand-written story submitted by ${submission.codename}`}
        rotation={submission.rotation}
        disablePreview={disablePreview}
        containerProps={{
          onClick: disablePreview ? undefined : openSubmission,
        }}
      />
      <SubmissionCardFooter
        age={age}
        codename={submission.codename}
        position={position}
        openSubmission={openSubmission}
        hasRead={hasRead}
        hasReadAll={hasReadAll}
        phase={phase}
      />
    </Card>
  );
}
