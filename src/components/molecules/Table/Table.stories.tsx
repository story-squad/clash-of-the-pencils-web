import { Meta, Story } from '@storybook/react';
import React from 'react';
import Table, { ITableProps } from './Table';

const Template: Story<ITableProps> = (props) => <Table {...props} />;

export const Default = Template.bind({});
Default.args = {
  headings: ['Col 1', 'Col 2', 'Cutoff Test'],
  rows: [
    ['1', '2', 'A RATHER LONG STRING OF TEXT THAT WILL HOPEFULLY BE CUT OFF!'],
    ['2', '3', 'A RATHER LONG STRING OF TEXT THAT WILL HOPEFULLY BE CUT OFF!'],
    ['3', '4', 'A RATHER LONG STRING OF TEXT THAT WILL HOPEFULLY BE CUT OFF!'],
  ],
};

export default {
  title: 'Components/Molecules/Table',
  component: Table,
} as Meta<ITableProps>;
