import React from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../api';
import { app } from '../../../state';
import { Button } from '../../atoms';
import { Countdown } from '../../molecules';
import './styles/index.scss';

export interface IPromptOrganismProps {
  prompt: Prompts.IPrompt;
  openUploadModal: () => void;
}

export default function PromptOrganism({
  prompt,
  openUploadModal,
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
        <UploadButton onClick={openUploadModal} />
      </div>
    </section>
  );
}

function UploadButton({
  onClick,
}: {
  onClick: () => void;
}): React.ReactElement {
  const phase = useRecoilValue(app.phase);
  return (
    <Button onClick={onClick} disabled={phase !== 'submit'}>
      Upload Story
    </Button>
  );
}
