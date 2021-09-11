import { ReactNode } from 'react';

type InputVariants = 'default' | 'success' | 'error' | 'warning';

type InputFieldTypes =
  | 'text'
  | 'email'
  // | "phone"
  | 'date'
  | 'time'
  | 'textarea';

export interface IInputFieldProps {
  variant?: InputVariants;
  inputType?: InputFieldTypes;
  placeholder?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  // the message is for the error message on the input
  error?: string;
}
