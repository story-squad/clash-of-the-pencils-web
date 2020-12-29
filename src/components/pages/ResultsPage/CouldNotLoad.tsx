import React from 'react';

const CouldNotLoad = (): React.ReactElement => {
  return (
    <div className="could-not-load">
      <div className="message">Data not available &#128557;</div>
      <p>Check back later!</p>
    </div>
  );
};

export default CouldNotLoad;
