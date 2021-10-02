import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import TermsView from './TermsView';

const Template: Story = (props) => <TermsView {...props} />;

export const Default = Template.bind({});

export default {
  title: 'Views/TermsOfService',
  component: TermsView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <BrowserRouter>
        <RecoilRoot>{story()}</RecoilRoot>
      </BrowserRouter>
    ),
  ],
} as Meta;
