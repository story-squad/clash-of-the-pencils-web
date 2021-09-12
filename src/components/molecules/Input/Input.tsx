import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { IInputFieldProps, InputField } from '../../atoms/InputField';
import { ILabelProps, InputLabel } from '../../atoms/InputLabel';
import './input.scss';

export interface InputProps extends IInputFieldProps, ILabelProps {}

const Input = ({
  label,
  labelType,
  tooltip,
  ...props
}: InputProps): React.ReactElement => {
  return (
    <div className="form-input">
      <InputLabel label={label} labelType={labelType} tooltip={tooltip} />
      <InputField {...props} />
      <ErrorMessage
        name={props.name}
        render={({ message }) => (
          <div className="message">
            <span>{message}</span>
          </div>
        )}
      />
    </div>
  );
};

export default Input;
