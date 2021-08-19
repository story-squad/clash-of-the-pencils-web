import { Meta, Story } from '@storybook/react';
import React from 'react';
import './styles/storyContent.scss';
import TwoColumn, { ITwoColumnProps } from './TwoColumn';

const Template: Story<ITwoColumnProps> = (props) => <TwoColumn {...props} />;

const Content = ({ p = 0 }: { p?: number }) => (
  <div className="content">
    {new Array(p).fill(
      <p>
        Enim sunt ullamco occaecat nostrud sunt exercitation ea dolore nisi non
        duis deserunt. Culpa ad aliqua sit officia sint exercitation nulla eu
        ullamco est veniam cupidatat. Laborum fugiat fugiat sint minim. Esse
        tempor excepteur ipsum Lorem eu nisi cupidatat non aliquip ullamco minim
        voluptate. Sunt duis irure proident qui aliqua consectetur et. Lorem
        cillum mollit enim aliquip.
      </p>,
    )}
  </div>
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
