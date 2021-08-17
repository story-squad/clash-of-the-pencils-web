import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import Header from './Header';

const Template: Story = (props) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((x) => !x);
  return <Header isMenuOpen={show} toggleMenu={toggle} {...props} />;
};

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
