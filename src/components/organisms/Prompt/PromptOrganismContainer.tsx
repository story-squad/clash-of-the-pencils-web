import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { app, prompts } from '../../../state';
import { Loader } from '../../molecules';
import PromptOrganism from './PromptOrganism';

function PromptOrganismContainer(): React.ReactElement {
  const prompt = useRecoilValue(prompts.currentPrompt);
  const now = useRecoilValue(app.now);
  const phase = useRecoilValue(app.phase);

  return <PromptOrganism prompt={prompt} now={now} phase={phase} />;
}

export default function PromptOrganismContainerFallback(): React.ReactElement {
  return (
    <Suspense fallback={<Loader />}>
      <PromptOrganismContainer />
    </Suspense>
  );
}
