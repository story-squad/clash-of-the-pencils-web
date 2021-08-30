import { Meta, Story } from '@storybook/react';
import React from 'react';
import { LoremIpsum } from '../../../data';
import './styles/storyContent.scss';
import TwoColumn, { ITwoColumnProps } from './TwoColumn';

const Template: Story<ITwoColumnProps> = (props) => <TwoColumn {...props} />;

const Content = ({ p = 0 }: { p?: number }) => (
  <div className="content">{new Array(p).fill(LoremIpsum)}</div>
);

export const Default = Template.bind({});
Default.args = {
  left: <Content p={2} />,
  right: <Content p={2} />,
};

export const UnevenContent = Template.bind({});
UnevenContent.args = {
  left: <Content p={2} />,
  right: <Content p={4} />,
};

export const LongContent = Template.bind({});
LongContent.args = {
  left: <Content p={5} />,
  right: <Content p={5} />,
};

export default {
  title: 'Components/Organisms/TwoColumn',
  component: TwoColumn,
  parameters: { layout: 'fullscreen' },
} as Meta;
