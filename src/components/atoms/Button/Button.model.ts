import { MouseEventHandler, ReactNode } from 'react';

export type ButtonTypes = 'primary' | 'secondary';

export interface ICustomButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonTypes;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  size?: 'lg' | 'sm';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}
