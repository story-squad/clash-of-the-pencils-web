import { classnames } from '@story-squad/react-utils';
import React from 'react';
import './styles/index.scss';

export default function Card({
  children,
}: React.PropsWithChildren<unknown>): React.ReactElement {
  return <div className={classnames('card')}>{children}</div>;
}
