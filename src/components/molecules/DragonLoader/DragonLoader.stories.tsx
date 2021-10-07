import { Meta, Story } from '@storybook/react';
import React from 'react';
import DragonLoader from './DragonLoader';

const Template: Story = (props) => <DragonLoader {...props} />;

export const Default = Template.bind({});

export default {
  title: 'Components/Molecules/DragonLoader',
  component: DragonLoader,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: 'skyblue',
          height: '100%',
        }}
      >
        {story()}
      </div>
    ),
  ],
} as Meta;
