import React from 'react';
import { useRecoilValue } from 'recoil';
import { deleteSubById } from '../../../api/Submissions';
import { submissions } from '../../../state';
import { Button, Card, Loader } from '../../atoms';
import DroppableSubmissionCard, {
  DroppableSubmissionCardProps,
} from './DroppableSubmissionCard';
import './styles/subCardLoader.scss';
import SubmissionCard from './SubmissionCard';
import { SubmissionCardContainerPropSwitcher } from './types';

function SubmissionCardContainer({
  submissionId,
  droppable,
  ...props
}: SubmissionCardContainerPropSwitcher): React.ReactElement {
  const submission = useRecoilValue(submissions.getById(submissionId));
  return submission ? (
    droppable ? (
      <DroppableSubmissionCard
        submission={submission}
        {...(props as Omit<DroppableSubmissionCardProps, 'submission'>)}
      />
    ) : (
      <div className="submission-wrapper">
        <SubmissionCard submission={submission} {...props} />
        <Button onClick={() => deleteSubById(submissionId)}>Delete</Button>
      </div>
    )
  ) : (
    <Card className="submission-card-failure">
      <p>Failed to load submission</p>
    </Card>
  );
}

export default function SubmissionCardContainerSuspense(
  props: SubmissionCardContainerPropSwitcher,
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
