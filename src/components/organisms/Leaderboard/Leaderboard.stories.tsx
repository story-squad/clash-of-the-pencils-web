import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import leaderboardData from '../../../data/leaderboardData';
import Leaderboard, { ILeaderboardProps } from './Leaderboard';
import './styles/index.scss';

const Template: Story<Pick<ILeaderboardProps, 'daily' | 'weekly'>> = (
  props,
) => {
  const [dailyIsOpen, setDailyIsOpen] = useState(true);
  // const openDaily = () => setDailyIsOpen(true);
  // const openWeekly = () => setDailyIsOpen(false);
  const toggleLeaderboard = () => setDailyIsOpen((is) => !is);
  return (
    <Leaderboard
      dailyIsOpen={dailyIsOpen}
      // openDaily={openDaily}
      // openWeekly={openWeekly}
      toggleLeaderboard={toggleLeaderboard}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = { ...leaderboardData };

export default {
  title: 'Components/Organisms/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
