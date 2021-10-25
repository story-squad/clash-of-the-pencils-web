import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { sleep } from '../../../utils';
import ForgotPasswordForm, {
  ForgotPasswordFormProps,
} from './ForgotPasswordForm';

const Template: Story<ForgotPasswordFormProps> = (props) => {
  return <ForgotPasswordForm {...props} />;
};

export const Default = Template.bind({});
Default.args = {
  onSubmit: async () => await sleep(2000),
  onSuccess: () => alert('Now you would be routed to the dashboard'),
};

export default {
  title: 'Components/Forms/ForgotPasswordForm',
  component: ForgotPasswordForm,
  decorators: [
    (story) => {
      const methods = useForm();
      return <FormProvider {...methods}>{story()}</FormProvider>;
    },
  ],
} as Meta;
