import React from 'react';
import './styles/index.scss';

interface StreamWrapperProps {
  id?: string;
}

export default function StreamWrapper({
  id,
  children,
}: React.PropsWithChildren<unknown> & StreamWrapperProps): React.ReactElement {
  return (
    <div className="stream-wrapper" id={id}>
      <div className="stream">{children}</div>
    </div>
  );
}
