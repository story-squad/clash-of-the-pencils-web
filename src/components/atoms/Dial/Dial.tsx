import React from 'react';
import './styles/index.scss';

export interface DialAtomProps {
  angle: number;
}

export default function Dial({ angle }: DialAtomProps): React.ReactElement {
  const dialStyles = { '--dial-angle': `${angle}deg` } as React.CSSProperties;
  return <div className="dial" style={dialStyles} />;
}
