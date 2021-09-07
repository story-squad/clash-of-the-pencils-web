import { Meta, Story } from '@storybook/react';
import React, { useMemo } from 'react';
import { time } from '../../../utils';
import Countdown from './Countdown';

interface CustomCountdownStoryProps {
  seconds: number;
}

const Template: Story<CustomCountdownStoryProps> = ({ seconds }) => {
  const { start, end } = useMemo(() => time.schedule.vote, [time.schedule]);
  return (
    <Countdown endTime={end} startTime={start} now={start.plus({ seconds })} />
  );
};

export const Default = Template.bind({});

export default {
  title: 'Components/Molecules/Countdown',
  component: Countdown,
  argTypes: {
    seconds: {
      defaultValue: 0,
      control: {
        type: 'range',
        max: time.schedule.vote.end.diff(time.schedule.vote.start, 'seconds')
          .seconds,
      },
    },
  },
  parameters: { layout: 'centered' },
} as Meta;
