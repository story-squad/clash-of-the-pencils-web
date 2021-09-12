import React, { useEffect } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import Input, { InputProps } from './Input';

export interface InputContainerProps
  extends Pick<
    InputProps,
    | 'iconLeft'
    | 'iconRight'
    | 'inputType'
    | 'label'
    | 'labelType'
    | 'placeholder'
    | 'tooltip'
  > {
  name: string;
  rules?: RegisterOptions;
  defaultValue?: unknown;
}

export default function InputContainer({
  name: nameProp,
  rules = {},
  defaultValue,
  ...inputProps
}: InputContainerProps): React.ReactElement {
  const { control } = useFormContext();
  useEffect(() => console.log(nameProp, rules), [rules]);
  return (
    <Controller
      name={nameProp}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Input
          error={error?.message}
          variant={error ? 'error' : 'default'}
          {...inputProps}
          {...field}
        />
      )}
    />
  );
}
