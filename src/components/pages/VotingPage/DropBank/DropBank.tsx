import React from 'react';
import DropContainer from './DropContainer';

const DropBank = (): React.ReactElement => {
  return (
    <div className="drop-bank">
      <h2>STUFF</h2>
      {new Array(3).map((empty, index) => (
        <DropContainer key={index} index={index} />
      ))}
    </div>
  );
};

export default DropBank;
