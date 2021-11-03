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
//ChickenNugget I am using this to find stuff

export default function PromptOrganism({
  prompt,
  openUploadModalOrSubmission,
  userHasSubmitted,
}: IPromptOrganismProps): React.ReactElement {
  const message = useRecoilValue(tutorial.currentMessage);

  return (
    <section id={PROMPT_BOX_ID} className="prompt">
      <div
        // Add these styles when its active during tutorial
        className={`${
          message.id === TUTORIAL_IDS.ID_PROMPT && 'active-tutorial'
        }`}
        id={TUTORIAL_IDS.ID_PROMPT}
      >
        <h1>Today&apos;s Writing Prompt</h1>
        <p
          //Add this style when tutorial is active
          style={{
            textAlign: 'center',
          }}
        >
          {prompt.prompt}
        </p>
      </div>
      {/* <div
        className={`${
          message.id === TUTORIAL_IDS.ID_ENCOURAGEMENT && 'active-tutorial'
        } button-wrapper`}
      >
        <EncouragementButton />
      </div> */}
      <div
        className={`${
          message.id === TUTORIAL_IDS.ID_TIMER && 'active-tutorial'
        } countdown-wrapper`}
      >
        <Countdown />
      </div>
      <div
        className={`${
          message.id === TUTORIAL_IDS.ID_UPLOAD && 'active-tutorial'
        } button-wrapper`}
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
