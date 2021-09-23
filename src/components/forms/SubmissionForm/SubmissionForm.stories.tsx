import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RecoilRoot } from 'recoil';
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
  },
};

export default {
  title: 'Components/Forms/SubmissionForm',
  component: SubmissionForm,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => {
      const methods = useForm();
      return (
        <RecoilRoot>
          <FormProvider {...methods}>{story()}</FormProvider>
        </RecoilRoot>
      );
    },
  ],
} as Meta;
