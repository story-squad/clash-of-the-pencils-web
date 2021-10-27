import { Meta, Story } from '@storybook/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Checkbox from './Checkbox';
import CheckboxContainer, { CheckboxContainerProps } from './CheckboxContainer';

const Template: Story<CheckboxContainerProps> = ({
  name = 'check',
  ...props
}) => {
  return <CheckboxContainer name={name} {...props} />;
};

export const Default = Template.bind({});
Default.args = { label: <>Click on the checkbox</> };

export const WithLink = Template.bind({});
WithLink.args = {
  label: (
    <>
      Click to <a>Open Nothing</a>
    </>
  ),
  id: 'somestring',
};

export default {
  title: 'Components/Molecules/Checkbox',
  component: Checkbox,
  decorators: [
    (story) => {
      const methods = useForm();
      return <FormProvider {...methods}>{story()}</FormProvider>;
    },
  ],
} as Meta;
