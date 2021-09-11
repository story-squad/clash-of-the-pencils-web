import { Meta, Story } from '@storybook/react';
import React from 'react';
import { CardList } from '../../organisms';
import InstructionCard from './InstructionCard';

const Template: Story = () => (
  <CardList>
    <InstructionCard step={1} />
    <InstructionCard step={2} />
    <InstructionCard step={3} />
  </CardList>
);

export const Default = Template.bind({});

export default {
  title: 'Components/Molecules/InstructionCard',
  component: InstructionCard,
} as Meta;
