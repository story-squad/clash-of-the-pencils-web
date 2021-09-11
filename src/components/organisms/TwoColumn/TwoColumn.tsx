import React, { ReactNode } from 'react';
import './styles/index.scss';

export interface ITwoColumnProps {
  left: ReactNode;
  right: ReactNode;
}

export default function TwoColumn({
  left,
  right,
}: ITwoColumnProps): React.ReactElement {
  return (
    <section className="two-column-layout">
      <div className="two-column-layout-container">
        <section className="col-left">{left}</section>
        <section className="col-right">{right}</section>
      </div>
    </section>
  );
}
