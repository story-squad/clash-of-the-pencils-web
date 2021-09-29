import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { promptData } from '../../../data';
import { sleep } from '../../../utils';
import { SubmissionModal } from '../../modals';
import PromptOrganism, { IPromptOrganismProps } from './PromptOrganism';

const Template: Story<IPromptOrganismProps> = ({
  prompt = promptData[7],
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onUploadSubmit = async () => {
    await sleep(2000);
  };
  return (
    <>
      <SubmissionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        prompt={prompt}
        onSubmit={onUploadSubmit}
      />
      <PromptOrganism prompt={prompt} {...props} />{' '}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export default {
  title: 'Components/Organisms/Prompt',
  component: PromptOrganism,
  parameters: { layout: 'fullscreen' },
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
} as Meta;
