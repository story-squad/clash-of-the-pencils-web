import React from 'react';
import { IInputFieldProps, InputField } from '../../atoms/InputField';
import { ILabelProps, InputLabel } from '../../atoms/InputLabel';
import './input.scss';

export interface InputProps extends IInputFieldProps, ILabelProps {}

const Input = ({
  label,
  labelType,
  tooltip,
  error,
  ...props
}: InputProps): React.ReactElement => {
  return (
    <div className="form-input">
      <InputLabel label={label} labelType={labelType} tooltip={tooltip} />
      <InputField {...props} />
      {error && (
        <div className="message">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
