import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from '.';
import { ICustomButtonProps } from './Button.model';

type Props = React.PropsWithChildren<ICustomButtonProps>;

const Template: Story<Props> = ({ iconLeft, iconRight, ...props }) => (
  <Button
    iconLeft={iconLeft && <FiArrowRight />}
    iconRight={iconRight && <FiArrowRight />}
    {...props}
  >
    {'Start Rumble'}
  </Button>
);

export const Interactive = Template.bind({});
Interactive.args = { type: 'primary', size: 'lg' };

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['primary', 'secondary'],
      control: {
        type: 'radio',
        labels: { primary: 'Primary', secondary: 'Secondary' },
      },
      defaultValue: 'primary',
    },
    size: {
      options: ['sm', 'lg'],
      control: { type: 'inline-radio', labels: { sm: 'Small', lg: 'Large' } },
      defaultValue: 'lg',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    iconLeft: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    iconRight: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta<Props>;
