import React from 'react';
import { TableCell } from './TableCell';

export interface ITableRowProps {
  row: React.ReactNode[];
}

export function TableRow({ row }: ITableRowProps): React.ReactElement {
  console.log('table row', row);
  return (
    <tr className="table-row">
      {row.map((cell, i) => (
        <TableCell key={i} cell={cell} />
      ))}
    </tr>
  );
}
