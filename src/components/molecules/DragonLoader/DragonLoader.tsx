import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { dragonBoi } from '../../../assets';
import { ILoaderProps, Loader, Picture } from '../../atoms';

export interface DragonLoaderProps extends ILoaderProps {
  containerProps?: React.HTMLProps<HTMLDivElement>;
}

export default function DragonLoader({
  containerProps: { className, ...containerProps } = {},
  ...props
}: DragonLoaderProps): React.ReactElement {
  return (
    <div className={classnames(className, 'dragon-loader')} {...containerProps}>
      <Picture
        source={dragonBoi}
        description="Blaze the Dragon"
        disablePreview
      />
      <Loader {...props} />
    </div>
  );
}
