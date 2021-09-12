import React, { ComponentProps } from 'react';
import { cleverLogo } from '../../../assets';
import { Button } from '../Button';
import './styles/index.scss';

export interface CleverButtonProps extends ComponentProps<typeof Button> {
  signUp?: boolean;
}

export default function CleverButton({
  signUp = false,
  ...props
}: CleverButtonProps): React.ReactElement {
  return (
    <Button
      className="clever-button"
      iconLeft={<img src={cleverLogo} alt="Clever Corporate Logo" />}
      {...props}
    >
      Sign {signUp ? 'Up' : 'In'} Using Clever
    </Button>
  );
}
