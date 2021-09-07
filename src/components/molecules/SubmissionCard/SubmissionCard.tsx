import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { app } from '../../../state';
import { Card, Picture } from '../../atoms';
import { PictureProps } from '../../atoms/Picture/Picture';
import './styles/index.scss';

export interface SubmissionCardProps {
  submission: Submissions.ISubItem;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  imageProps?: PictureProps;
}

export default function SubmissionCard({
  submission,
  containerProps,
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
        containerProps={{
          onClick: openSubmission,
        }}
      />
    </Card>
  );
}
