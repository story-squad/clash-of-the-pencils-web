import { classnames } from '@story-squad/react-utils';
import React from 'react';
import './styles/index.scss';

export default function Card({
  children,
  className,
  innerRef,
  ...props
}: React.PropsWithChildren<
  React.HTMLProps<HTMLDivElement> & {
    innerRef?: React.LegacyRef<HTMLDivElement>;
  }
>): React.ReactElement {
  return (
    <div className={classnames('card', className)} {...props} ref={innerRef}>
      {children}
    </div>
  );
}
