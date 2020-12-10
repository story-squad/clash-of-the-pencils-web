import React, { useState } from 'react';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';

const Input = ({
  name,
  label,
  register,
  type = 'text',
  rules = {},
  errors = {},
  showPassword,
  ...rest
}: InputProps): React.ReactElement => {
  // store the type prop in state so that it can be changed to show/hide the value in a password input
  const [inputType, setInputType] = useState(type);
  /**
   * Reveals or hides the value in a password input by toggling
   * the 'type' on the input between 'text' and 'password'
   */
  const toggleHiddenPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    inputType === 'password' ? setInputType('text') : setInputType('password');
  };
  return (
    <div className={`form-input${errors[name] ? ' error' : ''}`}>
      <label htmlFor={name}>{label} :</label>
      <input
        id={name}
        name={name}
        type={inputType}
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
  showPassword?: boolean;
}

export default Input;
