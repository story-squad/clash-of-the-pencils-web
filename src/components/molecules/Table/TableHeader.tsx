import React from 'react';

export interface ITableHeaderProps {
  /**
   * The headings will usually just be strings but can be passed in as
   * a custom React Node if custom classnames/styling/images/layout
   * need to be used as headings.
   */
  headings: React.ReactNode[];
}

export function TableHeader({
  headings,
}: ITableHeaderProps): React.ReactElement {
  return (
    <thead className="table-header">
      <tr className="table-row table-header-row">
        {headings.map((heading, i) => (
          <td key={i} className="table-header-cell table-cell">
            {heading}
          </td>
        ))}
      </tr>
    </thead>
  );
}
