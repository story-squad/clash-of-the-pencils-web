import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { deleteSubById } from '../../../api/Submissions';
import { useConfirmationModal } from '../../../hooks';
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
  showDelete,
  ...props
}: SubmissionCardContainerPropSwitcher): React.ReactElement {
  const submission = useRecoilValue(submissions.getById(submissionId));
  const subDeleted = useSetRecoilState(submissions.forceUpdate);
  const deleteSubmission = () => {
    // Deletes submission by ID
    deleteSubById(submissionId)
      .then((res) => {
        if (res !== null) {
          subDeleted(submissionId);
        }
      })
      .catch(() => {
        openError();
      });
    // is passed the id that was deleted
  };

  const [confirmDeleteModal, openModal] = useConfirmationModal({
    title: 'Delete this story',
    message:
      'This action is permanent. Are you sure you want to delete your story?',
    confirmText: 'Delete Story',
    cancelText: 'Cancel',
    onConfirm: deleteSubmission,
  });

  const [deleteError, openError] = useConfirmationModal({
    key: 1,
    title: 'There was an error deleting your story. Please try again later.',
    confirmText: 'Confirm',
  });

  return submission ? (
    droppable ? (
      <DroppableSubmissionCard
        submission={submission}
        {...(props as Omit<DroppableSubmissionCardProps, 'submission'>)}
      />
    ) : (
      <div className="submission-wrapper">
        <SubmissionCard submission={submission} {...props} />
        {showDelete && <Button onClick={openModal}>Delete</Button>}
        {confirmDeleteModal}
        {deleteError}
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
