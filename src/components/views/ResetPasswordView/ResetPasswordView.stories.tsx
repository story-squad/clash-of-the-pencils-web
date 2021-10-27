import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { sleep } from '../../../utils';
import ResetPasswordView from './ResetPasswordView';

const Template: Story = () => {
  const onSubmit = async () => {
    await sleep(2000);
  };
  const openLogin = () => alert('Opening Login');
  return <ResetPasswordView submitHandler={onSubmit} openLogin={openLogin} />;
};

export const Default = Template.bind({});

export default {
  title: 'Views/ResetPassword',
  component: ResetPasswordView,
  parameters: { layout: 'fullscreen' },
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as Meta;
