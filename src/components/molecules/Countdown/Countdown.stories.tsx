import { Meta, Story } from '@storybook/react';
import { DateTime } from 'luxon';
import React from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

interface CustomStoryCountdownProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const Template: Story<CustomStoryCountdownProps> = ({}) => {
  const s = time.schedule.submit.start.toISOString();
  const now = DateTime.now();
  const e = time.schedule.submit.end.toISOString();
  return (
    <Countdown
      endTime={DateTime.fromISO(e)}
      startTime={DateTime.fromISO(s)}
      now={now}
    />
  );
};

export const Default = Template.bind({});

export default {
  title: 'Components/Molecules/Countdown',
  component: Countdown,
  argTypes: {
    hours: {
      defaultValue: 0,
      control: {
        type: 'range',
        max: 12,
      },
    },
    minutes: {
      defaultValue: 0,
      control: {
        type: 'range',
        max: 59,
      },
    },
    seconds: {
      defaultValue: 0,
      control: {
        type: 'range',
        max: 59,
      },
    },
  },
  parameters: { layout: 'centered' },
} as Meta<CustomStoryCountdownProps>;
