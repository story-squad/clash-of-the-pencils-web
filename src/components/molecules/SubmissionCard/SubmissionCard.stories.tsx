import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { submissionData } from '../../../data';
import { CardList } from '../../organisms/CardList';
import { VotingDragAndDropContext } from '../../providers';
import { FullscreenImageOverlay } from '../../views';
import SubmissionCard, { SubmissionCardProps } from './SubmissionCard';

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
          {story()}
          <FullscreenImageOverlay />
        </VotingDragAndDropContext>
      </RecoilRoot>
    ),
  ],
} as Meta;
