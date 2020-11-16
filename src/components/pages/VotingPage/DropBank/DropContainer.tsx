import React from 'react';

const DropContainer = ({ index }: DropContainerProps): React.ReactElement => {
  return (
    <div className="drop-container">
      {console.log(index)}
      <p>item</p>
    </div>
  );
};

interface DropContainerProps {
  index: number;
}

export default DropContainer;
