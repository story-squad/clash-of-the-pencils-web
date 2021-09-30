import React from 'react';
import { TableRow } from './TableRow';

export interface ITableBodyProps {
  rows: React.ReactNode[][];
}

export function TableBody({ rows }: ITableBodyProps): React.ReactElement {
  return (
    <tbody className="table-body">
      {rows.map((row, i) => (
        <TableRow key={i} row={row} />
      ))}
      <div className="spacer" />
    </tbody>
  );
}
