import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './Header';

const Template: Story = () => <Header />;

export const Default = Template.bind({});

export default {
  title: 'Old/Common/Header',
  component: Header,
  decorators: [
    (story) => (
      <BrowserRouter>
        <RecoilRoot>{story()}</RecoilRoot>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
