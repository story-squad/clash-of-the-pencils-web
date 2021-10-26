import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { sleep } from '../../../utils';
import ForgotPasswordView, {
  ForgotPasswordViewProps,
} from './ForgotPasswordView';

const Template: Story<ForgotPasswordViewProps> = () => {
  const onSubmit = async () => {
    await sleep(2000);
  };
  const openDash = () => {
    alert('Opening Dashboard');
  };

  return <ForgotPasswordView openDashboard={openDash} onSubmit={onSubmit} />;
};

export const Default = Template.bind({});

export default {
  title: 'Views/ForgotPassword',
  component: ForgotPasswordView,
  parameters: { layout: 'fullscreen' },
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as Meta;
