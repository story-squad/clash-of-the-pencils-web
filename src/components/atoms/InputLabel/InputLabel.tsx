import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { ILabelProps } from './InputLabel.model';
import './styles/index.scss';

const Label = ({
  label,
  tooltip,
  labelType,
}: ILabelProps): React.ReactElement => {
  return (
    <label className="label">
      {labelType === 'required' && <span className="require">*</span>}
      {label} {tooltip ? <FiHelpCircle className="optional" /> : ''}
      {labelType === 'optional' && <span className="optional">(optional)</span>}
    </label>
  );
};

export default Label;
