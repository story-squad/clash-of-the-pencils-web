import React from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../api';
import { prompts } from '../../../state';
import { FormOnSubmit } from '../../forms/formTypes';
import SubmissionForm from '../../forms/SubmissionForm/SubmissionForm';
import { Modal, ModalProps } from '../../organisms';

export default function SubmissionModal({
  onSubmit = Submissions.uploadSubmission,
  ...props
}: Omit<ModalProps, 'component'> & {
  onSubmit?: FormOnSubmit<FormData>;
}): React.ReactElement {
  const prompt = useRecoilValue(prompts.currentPrompt);
  const closeModal = () => props.setIsOpen(false);

  return (
    <Modal
      component={() => (
        <SubmissionForm
          currentPrompt={prompt}
          onSubmit={onSubmit}
          onCancel={closeModal}
        />
      )}
      {...props}
    />
  );
}
