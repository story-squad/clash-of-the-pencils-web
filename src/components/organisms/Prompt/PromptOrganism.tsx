import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { Prompts } from '../../../api';
import { time } from '../../../utils';
import { Button } from '../../atoms';
import { SubmissionModal } from '../../modals';
import { Countdown } from '../../molecules';
import './styles/index.scss';

export interface IPromptOrganismProps {
  prompt: Prompts.IPrompt;
  now: DateTime;
  phase?: Exclude<time.eventType, 'off'>;
}

export default function PromptOrganism({
  prompt,
  now,
  phase = time.getCurrent({ now }),
}: IPromptOrganismProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  return (
    <section className="prompt">
      <SubmissionModal isOpen={isOpen} setIsOpen={setIsOpen} prompt={prompt} />
      <h1>Today&apos;s Writing Prompt</h1>
      <p>{prompt.prompt}</p>
      <div className="button-wrapper">
        <Button type="secondary">Encouragement Button</Button>
      </div>
      <div className="countdown-wrapper">
        <Countdown now={now} phase={phase} />
      </div>
      <div className="button-wrapper">
        <Button disabled={phase !== 'submit'} onClick={openModal}>
          Upload Story
        </Button>
      </div>
    </section>
  );
}
