import { Meta, Story } from '@storybook/react';
import React from 'react';
import CleverButton, { CleverButtonProps } from './CleverButton';

const Template: Story<CleverButtonProps> = (props) => (
  <CleverButton {...props} />
);

export const Default = Template.bind({});

export default {
  title: 'Components/Atoms/CleverButton',
  component: CleverButton,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta;
