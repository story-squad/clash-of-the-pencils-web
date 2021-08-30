import { Meta, Story } from '@storybook/react';
import React from 'react';
import Timer, { TimerProps } from './Timer';

const Template: Story<TimerProps> = (props) => <Timer {...props} />;

export const Default = Template.bind({});
Default.args = { displayTime: { h: 4, m: 30, s: 31 } };

export default {
  title: 'Components/Atoms/Timer',
  component: Timer,
  argTypes: {},
} as Meta;
