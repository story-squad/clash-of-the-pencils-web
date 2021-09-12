import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { userData } from '../../../data';
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
    return { token: 'sometoken', user: userData[0] };
  },
};

export default {
  title: 'Components/Forms/LoginForm',
  component: LoginForm,
  decorators: [
    (story) => {
      const methods = useForm();
      return <FormProvider {...methods}>{story()}</FormProvider>;
    },
  ],
} as Meta;
