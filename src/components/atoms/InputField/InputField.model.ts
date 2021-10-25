import { HTMLProps, LegacyRef, ReactNode } from 'react';

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
  extends Omit<HTMLProps<HTMLInputElement>, 'type' | 'name'> {
  variant?: InputVariants;
  inputType?: InputFieldTypes;
  placeholder?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  name: string;
  innerRef?: LegacyRef<HTMLInputElement>;
}
