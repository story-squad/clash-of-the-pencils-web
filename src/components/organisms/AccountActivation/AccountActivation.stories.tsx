import { Meta, Story } from '@storybook/react';
import React from 'react';
import { sleep } from '../../../utils';
import AccountActivation from './AccountActivation';
import { ActivationRequestFormProps } from './types';

const Template: Story<Partial<ActivationRequestFormProps>> = (props) => {
  const onError = () => alert('Error');
  const onSuccess = () => alert('Success');
  const onSubmit = async () => {
    await sleep(20000);
  };
  return (
    <AccountActivation
      onSubmit={onSubmit}
      onError={onError}
      onSuccess={onSuccess}
      {...props}
    />
  );
};

export const Default = Template.bind({});

export const Underage = Template.bind({});
Underage.args = { sendToParent: true };

export default {
  title: 'Components/Organisms/AccountActivation',
  component: AccountActivation,
  parameters: { layout: 'fullscreen' },
} as Meta;
