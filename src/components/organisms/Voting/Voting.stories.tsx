import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { submissionData } from '../../../data';
import { VotingDragAndDropContext } from '../../providers';
import FullscreenImageOverlayContainer from '../../views/FullscreenImageOverlay/FullscreenImageOverlayContainer';
import Voting, { VotingProps } from './Voting';

const Template: Story<VotingProps> = ({
  phase = 'vote',
  top3 = submissionData.slice(0, 3),
  ...props
}) => <Voting phase={phase} top3={top3} {...props} />;

export const Default = Template.bind({});

export const ReadMe = Template.bind({});
ReadMe.args = { phase: 'off' };

export default {
  title: 'Components/Organisms/Voting',
  component: Voting,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <RecoilRoot>
        <VotingDragAndDropContext>
          <FullscreenImageOverlayContainer />
          {story()}
        </VotingDragAndDropContext>
      </RecoilRoot>
    ),
  ],
} as Meta;
