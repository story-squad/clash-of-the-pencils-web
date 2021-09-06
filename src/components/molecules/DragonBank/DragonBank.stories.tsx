import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { VotingDragAndDropContext } from '../../providers';
import DragonBank from './DragonBank';

export const Default: Story = () => {
  return <DragonBank />;
};

export default {
  title: 'Components/Molecules/DragonBank',
  component: DragonBank,
  decorators: [
    (story) => (
      <RecoilRoot>
        <VotingDragAndDropContext>{story()}</VotingDragAndDropContext>
      </RecoilRoot>
    ),
  ],
} as Meta;
