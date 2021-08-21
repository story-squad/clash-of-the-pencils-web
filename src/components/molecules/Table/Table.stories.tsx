import { Meta, Story } from '@storybook/react';
import React from 'react';
import Table, { ITableProps } from './Table';

const Template: Story<ITableProps> = (props) => <Table {...props} />;

export const Default = Template.bind({});

export default {
  title: 'Components/Molecules/Table',
  component: Table,
} as Meta<ITableProps>;
