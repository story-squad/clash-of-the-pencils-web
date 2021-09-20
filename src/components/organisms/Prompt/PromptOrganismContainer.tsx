import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { app, prompts } from '../../../state';
import { time } from '../../../utils';
import { Loader } from '../../molecules';
import PromptOrganism from './PromptOrganism';

export interface PromptOrganismContainerProps {
  phase: Exclude<time.eventType, 'off'>;
}

function PromptOrganismContainer({
  phase,
}: PromptOrganismContainerProps): React.ReactElement {
  const prompt = useRecoilValue(prompts.currentPrompt);
  const now = useRecoilValue(app.now);
  return <PromptOrganism prompt={prompt} now={now} event={phase} />;
}

export default function PromptOrganismContainerFallback(
  props: PromptOrganismContainerProps,
): React.ReactElement {
  return (
    <Suspense fallback={Loader}>
      <PromptOrganismContainer {...props} />
    </Suspense>
  );
}
