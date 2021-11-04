import React from 'react';
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
    | 'toolTipMessage'
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
  return (
    <Controller
      name={nameProp}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Input
          variant={error ? 'error' : 'default'}
          innerRef={ref}
          {...inputProps}
          {...field}
        />
      )}
    />
  );
}
