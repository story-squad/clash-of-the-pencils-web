import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { submissionData } from '../../../data';
import { top3 } from '../../../state';
import { sleep } from '../../../utils';
import { VotingDragAndDropContext } from '../../providers';
import FullscreenImageOverlayContainer from '../../views/FullscreenImageOverlay/FullscreenImageOverlayContainer';
import Voting, { VotingProps } from './Voting';
import VotingContainer from './VotingContainer';

const Template: Story<VotingProps> = ({ phase = 'vote', ...props }) => (
  <VotingContainer
    {...props}
    phase={phase}
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
