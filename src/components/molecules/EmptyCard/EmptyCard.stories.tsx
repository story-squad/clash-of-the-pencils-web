import { Meta, Story } from '@storybook/react';
import React from 'react';
import { CardList } from '../../organisms/CardList';
import EmptyCard from './EmptyCard';

const Template: Story = (props) => (
  <CardList>
    <EmptyCard {...props} />
    <EmptyCard {...props} />
    <EmptyCard {...props} />
  </CardList>
);

export const Default = Template.bind({});

export default {
  title: 'Components/Molecules/EmptyCard',
  component: EmptyCard,
  parameters: { layout: 'padded' },
} as Meta;
