import React from 'react';
import { Prompts, Submissions } from '../../../api';
import { FormOnSubmit } from '../../forms/formTypes';
import SubmissionForm from '../../forms/SubmissionForm/SubmissionForm';
import { Modal, ModalProps } from '../../organisms';

export default function SubmissionModal({
  onSubmit = Submissions.uploadSubmission,
  prompt,
  ...props
}: Omit<ModalProps, 'component'> & {
  onSubmit?: FormOnSubmit<FormData>;
  prompt: Prompts.IPrompt;
}): React.ReactElement {
  return (
    <Modal
      component={({ closeModal }) => (
        <SubmissionForm
          currentPrompt={prompt}
          onSubmit={onSubmit}
          onCancel={closeModal}
          onSuccess={closeModal}
        />
      )}
      {...props}
    />
  );
}
