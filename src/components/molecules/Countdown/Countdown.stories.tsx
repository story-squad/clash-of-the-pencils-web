import { Meta, Story } from '@storybook/react';
import React, { useMemo } from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

interface CustomCountdownStoryProps {
  minutes: number;
}

const Template: Story<CustomCountdownStoryProps> = ({ minutes }) => {
  const { start, end } = useMemo(() => time.schedule.vote, [time.schedule]);
  return (
    <Countdown
      endTime={end}
      startTime={start}
      now={start.plus({ hour: 1, minutes, seconds: 28 })}
    />
  );
};

export const Default = Template.bind({});

export default {
  title: 'Components/Molecules/Countdown',
  component: Countdown,
  argTypes: {
    minutes: {
      defaultValue: 42,
      control: {
        type: 'range',
        max: 59,
      },
    },
  },
  parameters: { layout: 'centered' },
} as Meta;
