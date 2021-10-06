import { useAsync } from '@story-squad/react-utils';
import React, { ComponentProps, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Auth } from '../../../api';
import { cleverLogo } from '../../../assets';
import { auth } from '../../../state';
import { Button } from '../Button';
import './styles/index.scss';

export interface CleverButtonProps extends ComponentProps<typeof Button> {
  signUp?: boolean;
}

export default function CleverButton({
  signUp = false,
  ...props
}: CleverButtonProps): React.ReactElement {
  const [url, setUrl] = useRecoilState(auth.cleverLoginButtonURL);
  const useMockCleverButton = useRecoilValue(auth.useMockCleverButton);

  const [exec, loading, , err] = useAsync({
    asyncFunction: Auth.cleverButton,
    onSuccess: ({ url }) => setUrl(url),
  });

  // Error logging
  useEffect(() => console.log(`[CLVRBTN] ERR:`, err), [err]);

  useEffect(() => {
    if (!loading && !url && !useMockCleverButton) exec();
  }, []);

  const openClever = () => {
    if (url) {
      if (useMockCleverButton) {
        console.log('Redirecting to:', url);
      } else {
        window.location.assign(url);
      }
    }
  };

  const isDisabled = loading || !url;

  return (
    <Button
      className="clever-button"
      iconLeft={<img src={cleverLogo} alt="Clever Corporate Logo" />}
      onClick={openClever}
      disabled={isDisabled}
      {...props}
    >
      {err ? (
        <>Couldn&apos;t Connect to Clever</>
      ) : isDisabled ? (
        <>Loading Clever Sign On</>
      ) : (
        <>Sign {signUp ? 'Up' : 'In'} Using Clever</>
      )}
    </Button>
  );
}
