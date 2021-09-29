import { Meta, Story } from '@storybook/react';
import React from 'react';
import EncouragementButton from './EncouragementButton';

const Template: Story = () => <EncouragementButton />;

export const Default = Template.bind({});

export default {
  title: 'Components/Molecules/EncouragementButton',
  component: EncouragementButton,
} as Meta;
