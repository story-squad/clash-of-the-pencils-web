import { classnames } from '@story-squad/react-utils';
import React from 'react';
import './styles/index.scss';

export default function CardList({
  className,
  children,
  ...props
}: React.PropsWithChildren<
  React.HTMLProps<HTMLDivElement>
>): React.ReactElement {
  return (
    <div className={classnames('card-list', className)} {...props}>
      {children}
    </div>
  );
}
