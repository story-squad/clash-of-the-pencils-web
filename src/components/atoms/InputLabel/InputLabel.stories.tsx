import { Meta, Story } from '@storybook/react';
import React from 'react';
import { InputLabel } from '.';
import { ILabelProps } from './InputLabel.model';

type Props = ILabelProps;

const Template: Story<Props> = ({ label = 'INPUT LABEL', ...props }) => (
  <InputLabel label={label} {...props} />
);

export const Interactive = Template.bind({});

export default {
  title: 'Components/Atoms/InputLabel',
  component: InputLabel,
  argTypes: {
    labelType: {
      options: ['default', 'required', 'optional'],
      control: {
        type: 'radio',
        labels: {
          default: 'default',
          required: 'required',
          optional: 'optional',
        },
      },
      defaultValue: 'default',
    },
    toolTip: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta<Props>;
