import { Meta, Story } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import DashboardTemplate from './DashboardTemplate';
import { IDashboardTemplateProps } from './DashboardTemplate.model';

const Template: Story<IDashboardTemplateProps> = (props) => (
  <RecoilRoot>
    <DashboardTemplate {...props} />
  </RecoilRoot>
);

export const Default = Template.bind({});
Default.argTypes = {};

export default {
  title: 'Templates/Dashboard',
  component: DashboardTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
