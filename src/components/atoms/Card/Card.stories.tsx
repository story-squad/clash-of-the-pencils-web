import { Meta, Story } from '@storybook/react';
import React from 'react';
import Card from './Card';

const Template: Story = (props) => (
  <Card {...props}>
    <p
      style={{
        backgroundColor: 'orange',
        color: 'white',
        fontFamily: 'Open Sans',
        padding: '2rem 2.6rem',
        fontSize: '2rem',
        lineHeight: '2.8rem',
      }}
    >
      This is some text content in a card.
    </p>
  </Card>
);

export const Default = Template.bind({});

export default {
  title: 'Components/Atoms/Card',
  component: Card,
} as Meta;
