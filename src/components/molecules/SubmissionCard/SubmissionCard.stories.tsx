import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { submissionData } from '../../../data';
import { FullscreenImageOverlay } from '../../modals';
import { CardList } from '../../organisms';
import { VotingDragAndDropContext } from '../../providers';
import SubmissionCard from './SubmissionCard';
import { SubmissionCardProps } from './types';

const Template: Story<SubmissionCardProps> = (props) => (
  <CardList>
    <SubmissionCard {...props} />
    <SubmissionCard {...props} />
    <SubmissionCard {...props} />
  </CardList>
);

export const Default = Template.bind({});
Default.args = { submission: submissionData[0] };

export const Rotated = Template.bind({});
Rotated.args = { submission: submissionData[1] };

export default {
  title: 'Components/Molecules/SubmissionCard',
  component: SubmissionCard,
  parameters: { layout: 'padded' },
  decorators: [
    (story) => (
      <RecoilRoot>
        <VotingDragAndDropContext>
          <FullscreenImageOverlay />
          {story()}
        </VotingDragAndDropContext>
      </RecoilRoot>
    ),
  ],
} as Meta;
