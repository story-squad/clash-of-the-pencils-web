import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import ScheduleView from './ScheduleView';

const Template: Story = () => <ScheduleView />;

export const Default = Template.bind({});

export default {
  title: 'Views/Schedule',
  component: ScheduleView,
  decorators: [
    (story) => (
      <RecoilRoot>
        <BrowserRouter>{story()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
} as Meta;
