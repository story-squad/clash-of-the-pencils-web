import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { HeaderSwitcherProps } from './HeaderContainer';
import StorySquadHeader from './StorySquadHeader';

const Template: Story<HeaderSwitcherProps> = (props) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((x) => !x);
  const openDashboard = () => undefined;
  return (
    <Header
      isMenuOpen={show}
      toggleMenu={toggle}
      openDashboard={openDashboard}
      {...props}
    />
  );
};

export const Default = Template.bind({});

export const StorySquad: Story = () => <StorySquadHeader />;

export default {
  title: 'Components/Organisms/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as Meta;
