import React from 'react';
import { UseFormMethods, ValidationRules } from 'react-hook-form';

const Input = ({
  name,
  label,
  register,
  type = 'text',
  rules = {},
  errors = {},
  ...rest
}: InputProps): React.ReactElement => {
  return (
    <div className={`form-input${errors[name] ? ' error' : ''}`}>
      <label>{label} :</label>
      <input
        name={name}
        type={type || 'text'}
        ref={register && register(rules)}
        autoComplete="off"
        {...rest}
      />
      <div className="message">
        <span className="red">*</span>{' '}
        {errors[name] ? errors[name].message : ''}
      </div>
    </div>
  );
};

interface InputProps
  extends Partial<Pick<UseFormMethods, 'register' | 'errors'>> {
  name: string;
  label: string;
  type?: string;
  rules?: ValidationRules;
}

export default Input;
