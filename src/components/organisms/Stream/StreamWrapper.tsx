import React from 'react';
import './styles/index.scss';

interface StreamWrapperProps {
  id?: string;
  className?: string;
}

export default function StreamWrapper({
  id,
  children,
  className,
}: React.PropsWithChildren<unknown> & StreamWrapperProps): React.ReactElement {
  return (
    <div className={`stream-wrapper ${className}`} id={id}>
      <div className="stream">{children}</div>
    </div>
  );
}
