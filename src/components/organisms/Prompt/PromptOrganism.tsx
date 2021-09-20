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
  event: Exclude<time.eventType, 'off'>;
}

export default function PromptOrganism({
  prompt,
  now,
  event,
}: IPromptOrganismProps): React.ReactElement {
  return (
    <section className="prompt">
      <h1>Today&apos;s Writing Prompt</h1>
      <p>{prompt.prompt}</p>
      <div className="button-wrapper">
        <Button>Upload Story</Button>
        <Button type="secondary" size="sm">
          Encouragement Button
        </Button>
      </div>
      <div className="countdown-wrapper">
        <Countdown now={now} event={event} />
      </div>
    </section>
  );
}
