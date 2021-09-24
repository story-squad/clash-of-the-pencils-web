import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { promptData } from '../../../data';
import { prompts } from '../../../state';
import { sleep } from '../../../utils';
import { Button } from '../../atoms';
import SubmissionModal from './SubmissionModal';

const Template: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  const currentPrompt = useRecoilValue(prompts.currentPrompt);
  const openModal = () => setIsOpen(true);
  const dummyOnSubmit = async () => {
    await sleep(2000);
  };

  return (
    <div>
      <Button onClick={openModal}>Open Modal</Button>
      <SubmissionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={dummyOnSubmit}
        prompt={currentPrompt}
      />
    </div>
  );
};

export const Default = Template.bind({});

export default {
  title: 'Modals/SubmissionModal',
  component: SubmissionModal,
  decorators: [
    (story) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(prompts.currentPrompt, promptData[0]);
        }}
      >
        {story()}
      </RecoilRoot>
    ),
  ],
} as Meta;
