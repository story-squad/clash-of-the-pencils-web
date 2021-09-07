import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { app } from '../../../state';
import { Card, Picture } from '../../atoms';
import './styles/index.scss';

export interface SubmissionCardProps {
  submission: Submissions.ISubItem;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  disablePreview?: boolean;
}

export default function SubmissionCard({
  submission,
  containerProps,
  disablePreview,
}: SubmissionCardProps): React.ReactElement {
  const openAnImageFullscreen = useSetRecoilState(app.imageView.openImage);
  const openSubmission = () => {
    openAnImageFullscreen({
      description: submission.prompt,
      source: submission.src,
      rotation: submission.rotation,
    });
  };
  return (
    <Card {...containerProps}>
      <Picture
        source={submission.src}
        description={`Hand-written story submitted by ${submission.codename}`}
        rotation={submission.rotation}
        disablePreview={disablePreview}
        containerProps={{
          onClick: disablePreview ? undefined : openSubmission,
        }}
      />
    </Card>
  );
}
