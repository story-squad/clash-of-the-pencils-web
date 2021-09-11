import { HTMLProps, ReactNode } from 'react';

type InputVariants = 'default' | 'success' | 'error' | 'warning';

type InputFieldTypes =
  | 'text'
  | 'email'
  // | "phone"
  | 'date'
  | 'time'
  | 'textarea'
  | 'password';

export interface IInputFieldProps
  extends Omit<HTMLProps<HTMLInputElement>, 'type'> {
  variant?: InputVariants;
  inputType?: InputFieldTypes;
  placeholder?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  // the message is for the error message on the input
  error?: string;
}
