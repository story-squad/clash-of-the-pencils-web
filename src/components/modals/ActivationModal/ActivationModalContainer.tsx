import { parse, ParsedQuery } from 'query-string';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../state';
import ActivationModal from './ActivationModal';

const MODAL_STAYS_OPEN_FOR = 4; // in seconds

export default function ActivationModalContainer({
  history: { push },
  location: { search },
}: RouteComponentProps): React.ReactElement {
  const [activationSuccessful, setActivationSuccessful] = useState<boolean>();
  const login = useSetRecoilState(auth.login);

  const backToDashboard = () => push('/');

  useEffect(() => {
    const parsedParams = parse(search);
    const userString = extract(parsedParams, 'user');
    const tokenString = extract(parsedParams, 'token');

    if (userString && tokenString) {
      const user = JSON.parse(userString);
      login({ user, token: tokenString });
      setActivationSuccessful(true);
    } else {
      setActivationSuccessful(false);
    }

    // Go back to dash after timeout
    setTimeout(backToDashboard, MODAL_STAYS_OPEN_FOR * 1000);
  }, []);

  return (
    <ActivationModal
      isOpen={true}
      setIsOpen={() => undefined}
      success={activationSuccessful}
    />
  );
}

function extract(obj: ParsedQuery, key: string): string | null {
  const item = obj[key];
  if (Array.isArray(item)) return item[0];
  else return item;
}
