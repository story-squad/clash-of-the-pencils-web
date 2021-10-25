import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { submissionData } from '../../../data';
import { app, submissions } from '../../../state';
import { sleep, time } from '../../../utils';
import { FullscreenImageOverlay } from '../../modals';
import { VotingDragAndDropContext } from '../../providers';
import Voting, { VotingProps } from './Voting';
import VotingContainer from './VotingContainer';

const Template: Story<VotingProps> = ({ ...props }) => (
  <VotingContainer
    {...props}
    submitVotes={async () => {
      await sleep(2000);
    }}
  />
);

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/Voting',
  component: Voting,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(submissions.top3.add, submissionData.slice(0, 3));
          set(app.now, time.schedule.vote.start);
        }}
      >
        <VotingDragAndDropContext>
          <FullscreenImageOverlay />
          {story()}
        </VotingDragAndDropContext>
      </RecoilRoot>
    ),
  ],
} as Meta;
