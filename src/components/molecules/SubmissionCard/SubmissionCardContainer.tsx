import React from 'react';
import { useRecoilValue } from 'recoil';
import { submissions } from '../../../state';
import { Card, Loader } from '../../atoms';
import './styles/subCardLoader.scss';
import SubmissionCard, { SubmissionCardProps } from './SubmissionCard';

export type SubmissionCardContainerProps = Omit<
  SubmissionCardProps,
  'submission'
> & {
  submissionId: number;
};

function SubmissionCardContainer({
  submissionId,
  ...props
}: SubmissionCardContainerProps): React.ReactElement {
  const submission = useRecoilValue(submissions.getById(submissionId));
  return submission ? (
    <SubmissionCard submission={submission} {...props} />
  ) : (
    <Card className="submission-card-failure">
      <p>Failed to load submission</p>
    </Card>
  );
}

export default function SubmissionCardContainerSuspense(
  props: SubmissionCardContainerProps,
): React.ReactElement {
  return (
    <React.Suspense
      fallback={
        <Card className="submission-card-loader">
          <Loader message="Loading submission" />
        </Card>
      }
    >
      <SubmissionCardContainer {...props} />
    </React.Suspense>
  );
}
