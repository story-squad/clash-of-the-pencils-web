import React, { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { ILabelProps } from './InputLabel.model';
import './styles/index.scss';

const Label = ({
  toolTipMessage,
  label,
  tooltip,
  labelType,
}: ILabelProps): React.ReactElement => {
  const [visible, setVisible] = useState(false);

  return (
    <label className="label">
      {visible && (
        <div className="tooltip-visible">
          <p>{toolTipMessage}</p>
        </div>
      )}
      {labelType === 'required' && <span className="require">*</span>}
      {label}
      {tooltip ? (
        <FiHelpCircle
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="optional tooltip"
        />
      ) : (
        ''
      )}
      {labelType === 'optional' && <span className="optional">(optional)</span>}
    </label>
  );
};

export default Label;
