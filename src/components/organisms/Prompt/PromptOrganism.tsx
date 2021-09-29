import React from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../api';
import { app } from '../../../state';
import { Button } from '../../atoms';
import { Countdown } from '../../molecules';
import './styles/index.scss';

export interface IPromptOrganismProps {
  prompt: Prompts.IPrompt;
  openUploadModalOrSubmission: () => void;
  userHasSubmitted: boolean;
}

export default function PromptOrganism({
  prompt,
  openUploadModalOrSubmission,
  userHasSubmitted,
}: IPromptOrganismProps): React.ReactElement {
  return (
    <section className="prompt">
      <h1>Today&apos;s Writing Prompt</h1>
      <p>{prompt.prompt}</p>
      <div className="button-wrapper">
        <Button type="secondary">Encouragement Button</Button>
      </div>
      <div className="countdown-wrapper">
        <Countdown />
      </div>
      <div className="button-wrapper">
        <PromptActionButton
          onClick={openUploadModalOrSubmission}
          userHasSubmitted={userHasSubmitted}
        />
      </div>
    </section>
  );
}

function PromptActionButton({
  onClick,
  userHasSubmitted,
}: {
  onClick: () => void;
  userHasSubmitted: boolean;
}): React.ReactElement {
  const phase = useRecoilValue(app.phase);

  let message = 'Upload Story';
  let disabled = false;

  // During non-submission phases, we should never get enabled upload button

  if (userHasSubmitted) {
    message = 'View Submission';
  } else if (phase !== 'submit') {
    disabled = true;
  }
  return (
    <Button onClick={onClick} disabled={disabled}>
      {message}
    </Button>
  );
}
