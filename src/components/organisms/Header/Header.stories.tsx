import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { userData } from '../../../data';
import Header from './Header';
import StorySquadHeader from './StorySquadHeader';
import { HeaderContextProvider } from './useHeaderContext';

const Template: Story = ({ isLogged }: { isLogged?: boolean }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const toggleMenu = () => setMenuIsOpen((p) => !p);
  const closeMenu = () => setMenuIsOpen(false);
  const user = isLogged ? userData[0] : undefined;
  const empty = closeMenu;
  return (
    <HeaderContextProvider
      value={{
        menuIsOpen,
        closeMenu,
        openDashboard: empty,
        toggleMenu,
        user,
        logout: empty,
      }}
    >
      <Header />
    </HeaderContextProvider>
  );
};

export const Default = Template.bind({});

export const LoggedIn = Template.bind({});
LoggedIn.args = { isLogged: true };

export const StorySquad: Story = () => <StorySquadHeader />;

export default {
  title: 'Components/Organisms/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
} as Meta;
