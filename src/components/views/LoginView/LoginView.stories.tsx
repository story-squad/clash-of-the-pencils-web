import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { sleep } from '../../../utils';
import LoginView, { LoginViewProps } from './LoginView';

const Template: Story<LoginViewProps> = () => {
  async function onSubmit(data: unknown) {
    console.log('Submitting...');
    await sleep(2000);
    console.log('Submitted!', data);
  }

  return <LoginView onSubmit={onSubmit} />;
};

export const Default = Template.bind({});

export default {
  title: 'Views/Login',
  component: LoginView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <RecoilRoot>
        <BrowserRouter>{story()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
} as Meta;
