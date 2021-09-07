import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { submissionData } from '../../../data';
import { FullscreenImageOverlay } from '../../views';
import SubmissionCard, { SubmissionCardProps } from './SubmissionCard';

const Template: Story<SubmissionCardProps> = (props) => (
  <SubmissionCard {...props} />
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
      <div
        style={{
          position: 'relative',
        }}
      >
        <RecoilRoot>
          {story()}
          <FullscreenImageOverlay />
        </RecoilRoot>
      </div>
    ),
  ],
} as Meta;
