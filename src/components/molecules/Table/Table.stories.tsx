import { Meta, Story } from '@storybook/react';
import React from 'react';
import Table, { ITableProps } from './Table';

const Template: Story<ITableProps> = (props) => <Table {...props} />;

export const Default = Template.bind({});
Default.args = {
  headings: ['Col 1', 'Col 2'],
  rows: [
    ['1', '2'],
    ['2', '3'],
    ['3', '4'],
  ],
};

export default {
  title: 'Components/Molecules/Table',
  component: Table,
} as Meta<ITableProps>;
