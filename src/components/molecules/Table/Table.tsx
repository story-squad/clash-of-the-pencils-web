import React from 'react';

export interface ITableProps {
  /**
   * The rows of the table, NOT including the header
   */
  rows: unknown[];
  /**
   * An array of React Nodes that serve as table headers
   */
  cols: React.ReactNode[];
}

export default function Table({ cols, rows }: ITableProps): React.ReactElement {
  return <article className="table"></article>;
}
