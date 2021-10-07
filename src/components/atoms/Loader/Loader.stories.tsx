import { Meta, Story } from '@storybook/react';
import React from 'react';
import Loader from './Loader';
import { ILoaderProps } from './loaderTypes';

const Template: Story<React.PropsWithChildren<ILoaderProps>> = (args) => (
  <Loader {...args} />
);

export const Default = Template.bind({});

export const CustomMessage = Template.bind({});
CustomMessage.args = { message: 'Opening your file' };

export const HideDots = Template.bind({});
HideDots.args = { hideDots: true };

export const NotCentered = Template.bind({});
NotCentered.args = { center: false };
NotCentered.parameters = { layout: 'padded' };

export default {
  title: 'Components/Molecules/Loader',
  component: Loader,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
