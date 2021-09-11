import { classnames } from '@story-squad/react-utils';
import React from 'react';
import './styles/index.scss';

export default function Card({
  children,
  className,
  ...props
}: React.PropsWithChildren<
  React.HTMLProps<HTMLDivElement>
>): React.ReactElement {
  return (
    <div className={classnames('card', className)} {...props}>
      {children}
    </div>
  );
}
