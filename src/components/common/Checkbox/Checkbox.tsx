import React from 'react';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';

const Checkbox = ({
  name,
  label,
  register,
  rules = {},
  errors = {},
  ...rest
}: CheckboxProps): React.ReactElement => {
  return (
    <div className={`checkbox${errors[name] ? ' error' : ''}`}>
      <label htmlFor={name}>
        <input
          id={name}
          name={name}
          type="checkbox"
          ref={register && register(rules)}
          autoComplete="off"
          {...rest}
        />{' '}
        {label}
      </label>
      <div className="message">
        <span className="red">*</span>{' '}
        {errors[name] ? errors[name].message : ''}
      </div>
    </div>
  );
};

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: React.ReactElement;
  register: UseFormMethods['register'];
  rules?: RegisterOptions;
  errors?: UseFormMethods['errors'];
}

export default Checkbox;
