import React from 'react';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';

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
      <label htmlFor={name}>{label} :</label>
      <input
        id={name}
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

interface InputProps {
  name: string;
  label: string;
  register: UseFormMethods['register'];
  type?: string;
  rules?: RegisterOptions;
  errors?: UseFormMethods['errors'];
}

export default Input;
