import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { auth } from '../../../state';
import { sleep } from '../../../utils';
import SignupView, { SignupViewProps } from './SignupView';

const Template: Story<SignupViewProps> = () => {
  async function onSubmit(data: unknown) {
    console.log('Submitting...');
    await sleep(2000);
    console.log('Submitted!', data);
  }
  function openLogin() {
    console.log('Opening Login.');
  }

  return <SignupView onSubmit={onSubmit} openLogin={openLogin} />;
};

export const Default = Template.bind({});

export default {
  title: 'Views/Signup',
  component: SignupView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <RecoilRoot
        initializeState={({ set }) => {
          set(auth.useMockCleverButton, true);
          set(auth.cleverLoginButtonURL, 'notarealurl.com');
        }}
      >
        <BrowserRouter>{story()}</BrowserRouter>
      </RecoilRoot>
    ),
  ],
} as Meta;
