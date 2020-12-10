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
    <div className="text">
      <input
        id={name}
        name={name}
        type="checkbox"
        ref={register && register(rules)}
        autoComplete="off"
        {...rest}
      />
      <label htmlFor={name}> {label}</label>
      <div className={`form-input${errors[name] ? ' error' : ''}`}>
        <div className="message">
          <span className="red">*</span>{' '}
          {errors[name] ? errors[name].message : ''}
        </div>
      </div>
    </div>
  );
};

interface CheckboxProps {
  name: string;
  label: React.ReactElement;
  register: UseFormMethods['register'];
  rules?: RegisterOptions;
  errors?: UseFormMethods['errors'];
}

export default Checkbox;
