import { classnames } from '@story-squad/react-utils';
import React from 'react';
import './styles/index.scss';
import { ITableBodyProps, TableBody } from './TableBody';
import { ITableHeaderProps, TableHeader } from './TableHeader';

export interface ITableProps extends ITableHeaderProps, ITableBodyProps {}

export default function Table({
  headings,
  rows,
}: ITableProps): React.ReactElement {
  return (
    <table className={classnames('table', rows.length > 0 && 'not-empty')}>
      <TableHeader headings={headings} />
      <TableBody rows={rows} />
    </table>
  );
}
