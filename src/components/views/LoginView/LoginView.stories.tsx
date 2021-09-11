import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import LoginView from './LoginView';

const Template: Story = () => <LoginView />;

export const Default = Template.bind({});

export default {
  title: 'Views/Login',
  component: LoginView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <RecoilRoot>
        <BrowserRouter>{story()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
} as Meta;
