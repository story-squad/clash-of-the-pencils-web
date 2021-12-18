import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../api';
import { TUTORIAL_IDS } from '../../../config';
import { PROMPT_BOX_ID } from '../../../config/tutorialSelectionIds';
import { app, tutorial } from '../../../state';
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
  const message = useRecoilValue(tutorial.currentMessage);

  return (
    <section id={PROMPT_BOX_ID} className="prompt">
      <div
        className={classnames(
          message.id === TUTORIAL_IDS.ID_PROMPT && 'active-tutorial',
        )}
        id={TUTORIAL_IDS.ID_PROMPT}
      >
        <h1>Today&apos;s Writing Prompt</h1>
        <p>{prompt.prompt}</p>
      </div>
      {/* <div
        className={classnames(
          'button-wrapper',
          message.id === TUTORIAL_IDS.ID_ENCOURAGEMENT && 'active-tutorial',
        )}
      >
        <EncouragementButton />
      </div> */}
      <div
        className={classnames(
          'countdown-wrapper',
          message.id === TUTORIAL_IDS.ID_TIMER && 'active-tutorial',
        )}
      >
        <Countdown />
      </div>
      <div
        className={classnames(
          'button-wrapper',
          message.id === TUTORIAL_IDS.ID_UPLOAD && 'active-tutorial',
        )}
      >
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
    <Button id={TUTORIAL_IDS.ID_UPLOAD} onClick={onClick} disabled={disabled}>
      {message}
    </Button>
  );
}
