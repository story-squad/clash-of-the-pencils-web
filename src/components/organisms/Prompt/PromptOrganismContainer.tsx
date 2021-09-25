import React, { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { prompts } from '../../../state';
import { SubmissionModal } from '../../modals';
import { Loader } from '../../molecules';
import PromptOrganism from './PromptOrganism';

function PromptOrganismContainer(): React.ReactElement {
  const prompt = useRecoilValue(prompts.currentPrompt);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <SubmissionModal isOpen={isOpen} setIsOpen={setIsOpen} prompt={prompt} />
      <PromptOrganism prompt={prompt} openUploadModal={openModal} />
    </>
  );
}

export default function PromptOrganismContainerFallback(): React.ReactElement {
  return (
    <Suspense fallback={<Loader />}>
      <PromptOrganismContainer />
    </Suspense>
  );
}
