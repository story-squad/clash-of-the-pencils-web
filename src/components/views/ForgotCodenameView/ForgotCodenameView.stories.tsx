import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { sleep } from '../../../utils';
import { ForgotCodenameViewProps } from './ForgotCodenameView';
import ForgotCodenameView from './ForgotCodenameViewContainer';

const Template: Story<ForgotCodenameViewProps> = ({ onSubmit }) => {
  const dummySubmit = async () => {
    await sleep(2000);
  };
  return <ForgotCodenameView onSubmit={onSubmit ?? dummySubmit} />;
};

export const Default = Template.bind({});

export const Failure = Template.bind({});
Failure.args = {
  async onSubmit() {
    await sleep(2000);
    throw new Error();
  },
};

export default {
  title: 'Views/ForgotCodename',
  component: ForgotCodenameView,
  parameters: { layout: 'fullscreen' },
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as Meta;
