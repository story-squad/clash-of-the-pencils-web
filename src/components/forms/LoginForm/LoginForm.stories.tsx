import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import LoginForm, { LoginFormProps } from './LoginForm';

const Template: Story<LoginFormProps> = (props) => {
  return <LoginForm {...props} />;
};

export const Default = Template.bind({});
Default.args = { onSuccess: console.log };

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
