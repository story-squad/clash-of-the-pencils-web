import { Meta, Story } from '@storybook/react';
import React from 'react';
import { sleep } from '../../../utils';
import AccountActivation from './AccountActivation';

const Template: Story = () => {
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
    />
  );
};

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/AccountActivation',
  component: AccountActivation,
  parameters: { layout: 'fullscreen' },
} as Meta;
