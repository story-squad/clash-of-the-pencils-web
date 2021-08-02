import { Meta, Story } from '@storybook/react';
import React from 'react';
import Timer, { TimerProps } from './Timer';

const Template: Story<TimerProps> = (props) => <Timer {...props} />;

export const Basic = Template.bind({});

export default {
  title: 'Components/Atoms/Timer',
  component: Timer,
  argTypes: {},
} as Meta;
