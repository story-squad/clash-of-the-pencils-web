import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from '../../../api';
import { setToken } from '../../../utils';

export const Activation = (): React.ReactElement => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const activationCode = pathname.split('/activated/')[1];

    if (activationCode) {
      auth
        .activatedLogin(activationCode)
        .then((res) => {
          // setToken(res.data.token);
          // push('/register');
          console.log(res.data);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, []);

  return (
    <div>
      <h1>some stuff</h1>
    </div>
  );
};

export default Activation;
