import { Meta, Story } from '@storybook/react';
import React from 'react';
import Dial, { DialAtomProps } from './Dial';

const Template: Story<DialAtomProps> = (props) => <Dial {...props} />;

export const Default = Template.bind({});

export default {
  title: 'Components/Atoms/Dial',
  component: Dial,
  argTypes: {
    angle: {
      defaultValue: 90,
      control: {
        type: 'range',
        max: 360,
      },
    },
  },
  parameters: { layout: 'centered' },
} as Meta<DialAtomProps>;
