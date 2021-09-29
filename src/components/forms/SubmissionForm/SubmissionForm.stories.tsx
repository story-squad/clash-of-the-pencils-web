import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { promptData, submissionData } from '../../../data';
import { sleep } from '../../../utils';
import SubmissionForm, { SubmissionFormProps } from './SubmissionForm';

const Template: Story<SubmissionFormProps> = (props) => {
  return <SubmissionForm {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  onSubmit: async (data) => {
    console.log('[Form Data]', data);
    await sleep(2000);
    console.log('[DONE]');
    // This shuts up linter for our story but does little else
    return submissionData[0];
  },
  enableLogs: true,
  currentPrompt: promptData[0],
  onCancel: () => {
    console.log('[CANCEL] Cancel pressed.');
  },
};

export default {
  title: 'Components/Forms/SubmissionForm',
  component: SubmissionForm,
  parameters: { layout: 'fullscreen' },
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
} as Meta;
