import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { ICustomButtonProps } from './Button.model';
import './button.scss';

const Button = ({
  type = 'primary',
  size = 'lg',
  onClick,
  htmlType,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: React.PropsWithChildren<ICustomButtonProps>): React.ReactElement => {
  return (
    <button
      onClick={onClick}
      className={classnames('button', type, size, className, {
        iconLeft: !!iconLeft,
        iconRight: !!iconRight,
      })}
      type={htmlType}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
};

export default Button;
