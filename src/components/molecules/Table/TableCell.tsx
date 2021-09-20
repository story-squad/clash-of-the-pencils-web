import React, { ReactNode } from 'react';

export interface ITableCellProps {
  cell: ReactNode;
}

export function TableCell({ cell }: ITableCellProps): React.ReactElement {
  return <td className="table-cell">{cell}</td>;
}
