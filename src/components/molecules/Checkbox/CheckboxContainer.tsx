import React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import Checkbox, { CheckboxProps } from './Checkbox';

export interface CheckboxContainerProps extends CheckboxProps {
  rules?: RegisterOptions;
  defaultValue?: boolean;
}

export default function CheckboxContainer({
  rules,
  name,
  defaultValue,
  ...inputProps
}: CheckboxContainerProps): React.ReactElement {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field } }) => (
        <Checkbox innerRef={ref} {...inputProps} {...field} />
      )}
    />
  );
}
