import React from 'react';
import './styles/index.scss';

export default function CardList({
  children,
}: React.PropsWithChildren<unknown>): React.ReactElement {
  return <div className="card-list">{children}</div>;
}
