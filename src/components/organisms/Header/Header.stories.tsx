import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { userData } from '../../../data';
import Header from './Header';
import HeaderContext from './headerContext';
import StorySquadHeader from './StorySquadHeader';

const Template: Story = ({ isLogged }: { isLogged?: boolean }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => setMenuIsOpen((p) => !p);
  const closeMenu = () => setMenuIsOpen(false);
  const user = isLogged ? userData[0] : undefined;
  const openDashboard = () => undefined;
  return (
    <HeaderContext.Provider
      value={{
        menuIsOpen,
        closeMenu,
        openDashboard,
        toggleMenu,
        user,
      }}
    >
      <Header />
    </HeaderContext.Provider>
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
