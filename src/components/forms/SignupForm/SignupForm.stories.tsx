import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RecoilRoot } from 'recoil';
import { sleep } from '../../../utils';
import SignupForm, { SignupFormProps } from './SignupForm';

const Template: Story<SignupFormProps> = (props) => {
  return <SignupForm {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  onSubmit: async (data) => {
    console.log('[Form Data]', data);
    await sleep(2000);
  },
};

export default {
  title: 'Forms/SignupForm',
  component: SignupForm,
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
