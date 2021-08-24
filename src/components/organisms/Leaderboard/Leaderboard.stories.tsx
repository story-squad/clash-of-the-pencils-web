import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import Leaderboard, { ILeaderboardProps } from './Leaderboard';
import './styles/index.scss';

const Template: Story<Pick<ILeaderboardProps, 'daily' | 'weekly'>> = (
  props,
) => {
  const [dailyIsOpen, setDailyIsOpen] = useState(true);
  const openDaily = () => setDailyIsOpen(true);
  const openWeekly = () => setDailyIsOpen(false);
  const toggleLeaderboard = () => setDailyIsOpen((is) => !is);
  return (
    <Leaderboard
      dailyIsOpen={dailyIsOpen}
      openDaily={openDaily}
      openWeekly={openWeekly}
      toggleLeaderboard={toggleLeaderboard}
      {...props}
    />
  );
};

export const Default = Template.bind({});
Default.args = { ...getDisplayData() };

/**
 * Use this to generate table data for a leaderboard story
 * @returns fake data to spread in as story args
 */
function getDisplayData() {
  return {
    daily: [
      [1, 'Joanne', 100],
      [2, 'Joanne', 80],
      [3, 'Joanne', 65],
      [4, 'Joanne', 50],
    ],
    weekly: [
      [1, 'Joanne', 100],
      [2, 'Joanne', 80],
      [3, 'Joanne', 65],
      [4, 'Joanne', 50],
    ],
  };
}

export default {
  title: 'Components/Organisms/Leaderboard',
  component: Leaderboard,
} as Meta;
