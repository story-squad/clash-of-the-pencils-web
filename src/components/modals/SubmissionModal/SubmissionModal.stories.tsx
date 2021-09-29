import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { promptData, submissionData } from '../../../data';
import { app } from '../../../state';
import { sleep, time } from '../../../utils';
import { Button } from '../../atoms';
import SubmissionModal from './SubmissionModal';

const Template: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => setIsOpen(true);
  const dummyOnSubmit = async () => {
    await sleep(2000);
    return submissionData[0];
  };

  return (
    <div>
      <Button onClick={openModal}>Open Modal</Button>
      <SubmissionModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={dummyOnSubmit}
        prompt={promptData[0]}
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
          set(
            app.now,
            time.schedule.submit.start.plus({ hours: 1, minutes: 23 }),
          );
        }}
      >
        {story()}
      </RecoilRoot>
    ),
  ],
} as Meta;
