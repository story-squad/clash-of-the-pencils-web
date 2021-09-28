import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { submissionData } from '../../../data';
import { app, top3 } from '../../../state';
import { sleep, time } from '../../../utils';
import { VotingDragAndDropContext } from '../../providers';
import FullscreenImageOverlayContainer from '../../views/FullscreenImageOverlay/FullscreenImageOverlayContainer';
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
          set(top3.top3List, submissionData.slice(0, 3));
          set(app.now, time.schedule.vote.start);
        }}
      >
        <VotingDragAndDropContext>
          <FullscreenImageOverlayContainer />
          {story()}
        </VotingDragAndDropContext>
      </RecoilRoot>
    ),
  ],
} as Meta;
