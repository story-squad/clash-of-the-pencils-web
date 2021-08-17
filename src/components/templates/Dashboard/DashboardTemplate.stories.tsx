import { Meta, Story } from '@storybook/react';
import React from 'react';
import DashboardTemplate from './DashboardTemplate';
import { IDashboardTemplateProps } from './DashboardTemplate.model';

const Template: Story<IDashboardTemplateProps> = (props) => (
  <DashboardTemplate {...props} />
);

export const Default = Template.bind({});
Default.argTypes = {};

export default {
  title: 'Templates/Dashboard',
  component: DashboardTemplate,
} as Meta;
