import { Meta, Story } from '@storybook/react';
import React from 'react';
import Header from './Header';

const Template: Story = (props) => <Header {...props} />;

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
