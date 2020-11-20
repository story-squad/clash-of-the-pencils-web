import React from 'react';

import { AiFillInfoCircle } from 'react-icons/ai';

const InfoHoverTip = ({
  tip,
  position = 'center',
}: InfoHoverTipProps): React.ReactElement => {
  return (
    <div className="info-hover-tip">
      <AiFillInfoCircle />
      <div className={`tooltip ${position}`}>{tip}</div>
    </div>
  );
};

interface InfoHoverTipProps {
  tip: string;
  position?: 'left' | 'center' | 'right';
}

export default InfoHoverTip;
