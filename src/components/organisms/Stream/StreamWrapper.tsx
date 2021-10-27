import React, { useCallback } from 'react';
import { Button } from '../../atoms';
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
  const revealChampion = useCallback(() => {
    window.location.assign('/winners');
  }, []);
  return (
    <div className={`stream-wrapper ${className}`} id={id}>
      <div className="stream">
        {children}
        <Button onClick={revealChampion}>Reveal Champion</Button>
      </div>
    </div>
  );
}
