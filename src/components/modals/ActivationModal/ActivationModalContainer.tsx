import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth } from '../../../api';
import { auth } from '../../../state';
import ActivationModal from './ActivationModal';

const MODAL_STAYS_OPEN_ON_FAIL_FOR = 3; // in seconds

export default function ActivationModalContainer(): React.ReactElement {
  const [activationSuccessful, setActivationSuccessful] = useState<boolean>();
  const login = useSetRecoilState(auth.login);

  const navigate = useNavigate();
  const location = useLocation();

  const backToDashboard = () => navigate('/');
  const setDashTimeout = () => {
    // Go back to dash after timeout
    setTimeout(backToDashboard, MODAL_STAYS_OPEN_ON_FAIL_FOR * 1000);
  };

  useEffect(() => {
    const parsedParams = queryString.parse(location.search);
    const t = parsedParams.authToken;
    if (t && typeof t === 'string') {
      Auth.getMe(t)
        .then((res) => {
          setActivationSuccessful(true);
          login(res);
          backToDashboard();
        })
        .catch(() => {
          setActivationSuccessful(false);
          setDashTimeout();
        });
    } else {
      setActivationSuccessful(false);
      setDashTimeout();
    }
  }, []);

  return (
    <ActivationModal
      isOpen={true}
      setIsOpen={() => undefined}
      success={activationSuccessful}
    />
  );
}
