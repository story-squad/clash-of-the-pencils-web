import React from 'react';
import { IInputFieldProps, InputField } from '../../atoms/InputField';
import { ILabelProps, InputLabel } from '../../atoms/InputLabel';
import './input.scss';

const Input = ({
  label,
  labelType,
  toolTip,
  error,
  ...props
}: IInputFieldProps & ILabelProps): React.ReactElement => {
  return (
    <div>
      <InputLabel label={label} labelType={labelType} toolTip={toolTip} />
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
