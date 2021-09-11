import { Meta, Story } from '@storybook/react';
import React, { ReactNode } from 'react';
import Footer from './Footer';

const Template: Story = (props) => <Footer {...props} />;

export const Default = Template.bind({});

export default {
  title: 'Components/Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [pushFooterToBottom],
} as Meta;

function pushFooterToBottom(story: () => ReactNode) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexFlow: 'column-reverse',
      }}
    >
      {story()}
    </div>
  );
}
