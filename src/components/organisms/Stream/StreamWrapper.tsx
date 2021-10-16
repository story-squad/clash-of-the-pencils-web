import React from 'react';
import './styles/index.scss';

export default function StreamWrapper({
  children,
}: React.PropsWithChildren<unknown>): React.ReactElement {
  return (
    <div className="stream-wrapper">
      <div className="stream">{children}</div>
    </div>
  );
}
