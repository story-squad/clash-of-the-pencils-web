import { classnames } from '@story-squad/react-utils';
import React, { ReactNode } from 'react';
import './styles/index.scss';

export interface ITwoColumnProps {
  left: ReactNode;
  right: ReactNode;
}

export default function TwoColumn({
  left,
  right,
  className,
  ...props
}: ITwoColumnProps & React.HTMLProps<HTMLDivElement>): React.ReactElement {
  return (
    <section className={classnames('two-column-layout', className)} {...props}>
      <div className="two-column-layout-container">
        <section className="col-left">{left}</section>
        <section className="col-right">{right}</section>
      </div>
    </section>
  );
}
