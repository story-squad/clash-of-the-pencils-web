import React from 'react';

const CouldNotLoad = ({
  error,
  className,
}: CouldNotLoadProps): React.ReactElement => {
  return (
    <div className={`could-not-load${className ? ' ' + className : ''}`}>
      <div className="message">{error} &#128557;</div>
      <p>Check back later!</p>
    </div>
  );
};

interface CouldNotLoadProps {
  error: string;
  className?: string;
}

export default CouldNotLoad;
