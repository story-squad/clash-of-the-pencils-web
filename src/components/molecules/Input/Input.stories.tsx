import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiYoutube } from 'react-icons/fi';
import Input, { InputProps } from './Input';

const Template: Story<InputProps> = ({ iconLeft, iconRight, ...props }) => (
  <div style={{ width: 325 }}>
    <Input
      label="INPUT LABEL"
      {...props}
      placeholder="Placeholder Text"
      iconLeft={iconLeft && <FiYoutube />}
      iconRight={iconRight && <FiYoutube />}
    />
  </div>
);

export const Interactive = Template.bind({});

export default {
  title: 'Components/Molecules/Input',
  component: Input,
  decorators: [
    (story) => {
      const methods = useForm();
      return <FormProvider {...methods}>{story()}</FormProvider>;
    },
  ],
  argTypes: {
    inputType: {
      options: ['date', 'text', 'email', 'date', 'time', 'textarea'],
      control: {
        type: 'radio',
        labels: {
          date: 'date',
          text: 'text',
          email: 'email',
          // phone: "phone",
          time: 'time',
          textarea: 'textarea',
        },
      },
      defaultValue: 'text',
    },
    variant: {
      options: ['default', 'warning', 'success', 'error'],
      control: { type: 'radio' },
      labels: { default: 'default' },
      defaultValue: 'default',
    },
    iconLeft: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    iconRight: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
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
    error: {
      options: [
        'Please Enter Your Email',
        'Please Enter You Name',
        'Please Fill In Your email',
        '',
      ],
      control: { type: 'radio' },
    },
  },
} as Meta;
