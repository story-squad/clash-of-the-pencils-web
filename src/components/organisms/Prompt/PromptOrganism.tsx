import React from 'react';
import { Prompts } from '../../../api';
import { Button } from '../../atoms';
import './styles/index.scss';

export interface IPromptOrganismProps {
  prompt: Prompts.IPrompt;
}

export default function PromptOrganism({
  prompt,
}: IPromptOrganismProps): React.ReactElement {
  return (
    <section className="prompt">
      <h1>Today&apos;s Writing Prompt</h1>
      <p>{prompt.prompt}</p>
      <Button>Submit</Button>
      <Button type="secondary">Encouragement Button</Button>
    </section>
  );
}
