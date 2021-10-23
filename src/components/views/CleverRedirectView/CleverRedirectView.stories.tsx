import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import CleverRedirectView from './CleverRedirectView';

const Template: Story = () => <CleverRedirectView />;

export const Default = Template.bind({});

export default {
  title: 'Views/CleverRedirectView',
  component: CleverRedirectView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <RecoilRoot>
        <BrowserRouter>{story()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
} as Meta;
