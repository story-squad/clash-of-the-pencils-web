import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RecoilRoot } from 'recoil';
import { sleep } from '../../../utils';
import LoginForm, { LoginFormProps } from './LoginForm';

const Template: Story<LoginFormProps> = (props) => {
  return <LoginForm {...props} />;
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
  title: 'Components/Forms/LoginForm',
  component: LoginForm,
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
