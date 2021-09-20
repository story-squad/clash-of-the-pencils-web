import { DateTime } from 'luxon';
import React from 'react';
import { Prompts } from '../../../api';
import { time } from '../../../utils';
import { Button } from '../../atoms';
import { Countdown } from '../../molecules';
import './styles/index.scss';

export interface IPromptOrganismProps {
  prompt: Prompts.IPrompt;
  now: DateTime;
  phase: Exclude<time.eventType, 'off'>;
}

export default function PromptOrganism({
  prompt,
  now,
  phase,
}: IPromptOrganismProps): React.ReactElement {
  return (
    <section className="prompt">
      <h1>Today&apos;s Writing Prompt</h1>
      <p>{prompt.prompt}</p>
      <div className="button-wrapper">
        <Button type="secondary">Encouragement Button</Button>
      </div>
      <div className="countdown-wrapper">
        <Countdown now={now} phase={phase} />
      </div>
      <div className="button-wrapper">
        <Button disabled={phase !== 'submit'}>Upload Story</Button>
      </div>
    </section>
  );
}
