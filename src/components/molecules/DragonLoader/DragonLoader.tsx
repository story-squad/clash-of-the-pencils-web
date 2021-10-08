import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { dragonBoi } from '../../../assets';
import { ILoaderProps, Loader, Picture } from '../../atoms';
import './styles/index.scss';

export default function DragonLoader({
  className,
  ...props
}: ILoaderProps): React.ReactElement {
  return (
    <Loader
      className={classnames(className, 'dragon-loader')}
      flipLayout
      {...props}
    >
      <Picture
        source={dragonBoi}
        description="Blaze the Dragon"
        disablePreview
      />
    </Loader>
  );
}
