import React, { ReactNode } from 'react';

export interface ITableCellProps {
  cell: ReactNode;
}

export function TableCell({ cell }: ITableCellProps): React.ReactElement {
  console.log('cell', cell);
  return <td className="table-cell">{cell}</td>;
}
