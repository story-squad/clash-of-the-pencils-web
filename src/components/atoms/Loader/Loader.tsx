import { classnames } from '@story-squad/react-utils';
import React from 'react';
import Dots from './Dots';
import { ILoaderProps } from './loaderTypes';
import './styles/index.scss';

const Loader = ({
  message = 'Loading',
  hideDots = false,
  center = true,
  className,
  children,
  flipLayout = false,
}: React.PropsWithChildren<ILoaderProps>): React.ReactElement => {
  const loadMessage = (
    <div className="message">
      {message}
      {!hideDots && <Dots />}
    </div>
  );
  return (
    <div className={classnames('loader-wrapper', { center }, className)}>
      <div className="loader-container">
        {!flipLayout && loadMessage}
        {children && <div className="loader-content">{children}</div>}
        {flipLayout && loadMessage}
      </div>
    </div>
  );
};

export default Loader;
