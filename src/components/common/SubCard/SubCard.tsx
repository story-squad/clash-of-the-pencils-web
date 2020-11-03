import React from 'react';

interface SubCardProps {
  src: string;
  alt?: string;
}

const SubCard = ({ src, alt = '' }: SubCardProps): React.ReactElement => {
  return (
    <div className="sub-card">
      <img src={src} alt={alt} />
    </div>
  );
};

export default SubCard;
