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
}: React.PropsWithChildren<ILoaderProps>): React.ReactElement => {
  return (
    <div className={classnames('loader-wrapper', { center }, className)}>
      <div className="loader-container">
        <div className="message">
          {message}
          {!hideDots && <Dots />}
        </div>
        {children && <div className="loader-content">{children}</div>}
      </div>
    </div>
  );
};

export default Loader;
