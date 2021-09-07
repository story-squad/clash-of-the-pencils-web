import { Meta, Story } from '@storybook/react';
import React from 'react';
import Sticker, { StickerProps } from './Sticker';

const Template: Story<StickerProps> = (props) => <Sticker {...props} />;

export const Default = Template.bind({});

export default {
  title: 'Components/Atoms/Sticker',
  component: Sticker,
  argTypes: {
    type: {
      defaultValue: 'firstPlaceDragon',
      options: [
        'firstPlaceDragon',
        'secondPlaceDragon',
        'thirdPlaceDragon',
        'readMe',
        'checkmark',
        'dropZone',
      ],
      control: {
        type: 'radio',
        labels: {
          firstPlaceDragon: 'First Place',
          secondPlaceDragon: 'Second Place',
          thirdPlaceDragon: 'Third Place',
          readMe: 'Read Me',
          checkmark: 'Checkmark',
          dropZone: 'Drop Zone',
        },
      },
    },
  },
} as Meta;
