import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import Toggle, { IToggleProps } from './Toggle';

const Template: Story = () => {
  const [dailyIsOpen, setDailyIsOpen] = useState(true);
  const toggleLeaderboard = () => setDailyIsOpen((is) => !is);
  return (
    <Toggle
      leftIsSelected={dailyIsOpen}
      options={[{ text: 'Daily' }, { text: 'Weekly' }]}
      toggle={toggleLeaderboard}
    />
  );
};

export const Default = Template.bind({});

export default {
  title: 'Components/Atoms/Toggle',
  component: Toggle,
} as Meta<IToggleProps>;
